import { Client } from "@notionhq/client";
import type { Post, TagFilterItem } from "@/types/blog";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { unstable_cache } from "next/cache";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

function getPostMetadata(page: PageObjectResponse): Post {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse["cover"]) => {
    if (!cover) return "";

    switch (cover.type) {
      case "external":
        return cover.external.url;
      case "file":
        return cover.file.url;
      default:
        return "";
    }
  };

  return {
    id: page.id,
    title: properties.Title.type === "title" ? (properties.Title.title[0]?.plain_text ?? "") : "",
    description:
      properties.Description.type === "rich_text"
        ? (properties.Description.rich_text[0]?.plain_text ?? "")
        : "",
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === "multi_select"
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === "people"
        ? "" // PersonUserObjectResponse에는 name 속성이 없으므로 빈 문자열 반환
        : "",
    date: properties.Date.type === "date" ? (properties.Date.date?.start ?? "") : "",
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === "rich_text"
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

export const getPostBySlug = async (
  slug: string
): Promise<{
  markdown: string;
  post: Post | null;
}> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Status",
          select: {
            equals: "Published",
          },
        },
      ],
    },
  });

  if (!response.results[0]) {
    return {
      markdown: "",
      post: null,
    };
  }

  const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    markdown: parent,
    post: getPostMetadata(response.results[0] as PageObjectResponse),
  };
};

export interface GetPublishedPostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string | null;
}

export const getPublishedPosts = unstable_cache(
  async ({
    tag = "전체",
    sort = "latest",
    pageSize = 2,
    startCursor,
  }: GetPublishedPostsParams): Promise<GetPublishedPostsResponse> => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          ...(tag && tag !== "전체"
            ? [
                {
                  property: "Tags",
                  multi_select: {
                    contains: tag,
                  },
                },
              ]
            : []),
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: sort === "latest" ? "descending" : "ascending",
        },
      ],
      page_size: pageSize,
      start_cursor: startCursor,
    });

    const posts = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(getPostMetadata);

    return {
      posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  },
  undefined,
  {
    tags: ["posts"],
    revalidate: 60,
  }
);

export const getTags = unstable_cache(
  async (): Promise<TagFilterItem[]> => {
    const { posts } = await getPublishedPosts({ pageSize: 100 });

    // 모든 태그를 추출하고 각 태그의 출현 횟수를 계산
    const tagCount = posts.reduce(
      (acc, post) => {
        post.tags?.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    // TagFilterItem 형식으로 변환
    const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
      id: name,
      name,
      count,
    }));

    // "전체" 태그 추가
    tags.unshift({
      id: "all",
      name: "전체",
      count: posts.length,
    });

    // 태그 이름 기준으로 정렬 ("전체" 태그는 항상 첫 번째에 위치하도록 제외)
    const [allTag, ...restTags] = tags;
    const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));

    return [allTag, ...sortedTags];
  },
  undefined,
  {
    tags: ["posts", "tags"],
    revalidate: 60,
  }
);

// 특정 slug를 기준으로 "이전 글(더 과거)" / "다음 글(더 최신)"을 찾아오는 함수
// - Notion DB에서 Published 글을 Date 기준 내림차순(최신순)으로 가져온 뒤
//   현재 slug의 인덱스를 기준으로 앞/뒤 글을 계산합니다.
// - 글이 많을 수 있으므로 pagination으로 끝까지 순회하며 필요한 만큼만 확보합니다.
export const getAdjacentPosts = unstable_cache(
  async (
    slug: string
  ): Promise<{
    previousPost: Post | null; // 이전 글(더 과거)
    nextPost: Post | null; // 다음 글(더 최신)
  }> => {
    const pageSize = 100;

    let startCursor: string | undefined = undefined;
    let hasMore = true;

    const allPosts: Post[] = [];
    let currentIndex = -1;

    // 최신순 정렬 기준으로 현재 글 주변(이전/다음) 글을 계산하는 헬퍼
    // - nextPost(다음 글=더 최신) = index - 1
    // - previousPost(이전 글=더 과거) = index + 1
    const getAdjacentFromIndex = (posts: Post[], index: number) => {
      const nextPost = index - 1 >= 0 ? posts[index - 1] : null;
      const previousPost = index + 1 < posts.length ? posts[index + 1] : null;
      return { previousPost, nextPost };
    };

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          and: [
            {
              property: "Status",
              select: {
                equals: "Published",
              },
            },
          ],
        },
        sorts: [
          {
            property: "Date",
            direction: "descending", // 최신순
          },
        ],
        page_size: pageSize,
        start_cursor: startCursor,
      });

      const pagePosts = response.results
        .filter((page): page is PageObjectResponse => "properties" in page)
        .map(getPostMetadata);

      allPosts.push(...pagePosts);

      // 아직 현재 글의 위치를 못 찾았으면, 누적된 목록에서 현재 slug의 인덱스를 찾습니다.
      if (currentIndex === -1) currentIndex = allPosts.findIndex((post) => post.slug === slug);

      // 현재 글을 찾은 경우: 주변 글(이전/다음)을 계산합니다.
      if (currentIndex !== -1) {
        const adjacentPosts = getAdjacentFromIndex(allPosts, currentIndex);

        // 다음 글(더 최신)은 앞쪽 페이지에 있으므로 currentIndex를 찾은 시점에 이미 확보되어 있습니다.
        // 이전 글(더 과거)은 뒤쪽 페이지에 있을 수 있으므로, 없고(hasMore=true)면 한 번 더 조회합니다.
        const isPreviousPostReady = adjacentPosts.previousPost !== null || !response.has_more;
        if (isPreviousPostReady) return adjacentPosts;
      }

      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    // slug가 목록에 없는 경우(예: Published가 아니거나 잘못된 slug)
    return { previousPost: null, nextPost: null };
  },
  ["adjacent-posts"],
  {
    tags: ["posts"],
    revalidate: 60,
  }
);

export interface CreatePostParams {
  title: string;
  tag: string;
  content: string;
}

export const createPost = async ({ title, tag, content }: CreatePostParams) => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID!,
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: content,
            },
          },
        ],
      },
      Tags: {
        multi_select: [{ name: tag }],
      },
      Status: {
        select: {
          name: "Published",
        },
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });

  return response;
};
