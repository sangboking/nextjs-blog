## 상코딩 블로그 (Next.js + Notion)

Next.js App Router와 Notion API를 활용해 만든 개인 기술 블로그입니다.  
Notion 데이터베이스를 CMS처럼 사용해 블로그 글 목록/상세를 조회하고, 서버 컴포넌트와 Suspense를 이용해 UX를 개선했습니다.

- 배포 URL: https://nextjs-blog-gilt-two-15.vercel.app/

---

## 기술 스택

- 프레임워크
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
- 스타일링
  - Tailwind CSS 4
  - Radix UI 기반 커스텀 UI 컴포넌트 (`components/ui/*`)
  - 다크 모드: `next-themes`
- 데이터 & 상태 관리
  - Notion 공식 SDK: `@notionhq/client`
  - React Query: `@tanstack/react-query`
  - 무한 스크롤: `react-intersection-observer`
  - 캐싱: `next/cache` 의 `unstable_cache`
- 컨텐츠 렌더링
  - Notion 페이지 → Markdown: `notion-to-md`
  - MDX/Markdown 렌더링 및 하이라이팅: `@mdx-js/*`, `rehype-*`, `shiki`
- 기타
  - 댓글: `@giscus/react`
  - 날짜 처리: `date-fns`

---

## 블로그 기능 개요

- 블로그 글 목록
  - Notion 데이터베이스에서 `Status = "Published"` 인 페이지만 조회
  - 태그(`Tags`) 필터링, 최신순/오래된순 정렬 지원
  - React Query + IntersectionObserver 기반 무한 스크롤
- 블로그 글 상세
  - `Slug` 속성으로 단일 글 조회
  - Notion 블록을 Markdown 문자열로 변환 후 렌더링
  - 이전 글/다음 글 탐색 지원
- 태그 사이드바
  - 전체 글을 기반으로 태그별 글 개수 집계
  - `"전체"` 태그를 포함해 알파벳 순 정렬
- 글 작성
  - 서버에서 Notion API를 호출해 새 페이지 생성
  - 제목/태그/내용, 발행 상태(`Published`)와 날짜 자동 세팅

---

## Notion API 연동 구조

### 1. Notion 클라이언트 및 공통 로직 (`lib/notion.ts`)

- `@notionhq/client` 를 사용해 Notion 클라이언트를 초기화합니다.
  - `NOTION_TOKEN`
  - `NOTION_DATABASE_ID`  
  위 두 값은 환경 변수로 주입됩니다.
- `getPostMetadata(page)`  
  - Notion `PageObjectResponse`를 내부에서 사용하는 `Post` 타입으로 변환합니다.
  - 제목, 설명, 커버 이미지, 태그, 날짜, slug 등을 추출합니다.

### 2. 글 목록 조회: `getPublishedPosts`

- 함수 시그니처
  - `getPublishedPosts({ tag, sort, pageSize, startCursor })`
  - 반환 타입: `{ posts, hasMore, nextCursor }`
- 주요 동작
  - Notion 데이터베이스 쿼리
    - `Status = "Published"` 필터
    - 선택된 태그가 있다면 `Tags` 다중 선택에 `contains` 조건 추가
    - `Date` 속성을 기준으로 `latest`(최신순) / `oldest`(오래된순) 정렬
  - 페이지네이션
    - `page_size`, `start_cursor`를 이용해 Cursor 기반 페이지네이션
    - `has_more`, `next_cursor`를 함께 반환해 클라이언트에서 무한 스크롤을 구현할 수 있도록 합니다.
- 캐싱
  - `unstable_cache` 로 감싸 Next.js 레벨에서 결과를 캐싱합니다.
  - `tags: ["posts"]`, `revalidate: 60` 으로 60초 간 캐시된 데이터를 재사용합니다.

### 3. 단일 글 조회: `getPostBySlug`

- `Slug` 속성과 `Status = "Published"` 조건을 이용해 단일 글을 조회합니다.
- Notion 블록 데이터를 `notion-to-md` 를 사용해 Markdown 문자열로 변환합니다.
- 반환 값
  - `markdown`: 변환된 Markdown 문자열
  - `post`: 메타데이터 (`Post` 타입) 또는 글이 없을 경우 `null`

### 4. 태그 목록 조회: `getTags`

- `getPublishedPosts` 를 호출해 충분한 개수의 글을 조회한 뒤, 각 글의 `tags` 배열을 전부 모아 빈도수를 계산합니다.
- `TagFilterItem[]` 형태로 변환
  - `{ id, name, count }`
- `"전체"` 태그를 맨 앞에 추가하고, 나머지 태그는 이름 기준으로 정렬합니다.
- 이 함수 또한 `unstable_cache` 로 감싸 60초 단위로 캐싱합니다.

### 5. 이전/다음 글 조회: `getAdjacentPosts`

- 최신순(`Date` 내림차순)으로 정렬된 전체 `Published` 글 목록을 페이지네이션으로 순회하면서 현재 글의 위치를 찾습니다.
- 현재 글을 기준으로
  - 더 최신 글: 배열에서 이전 인덱스
  - 더 오래된 글: 배열에서 다음 인덱스
- `{ previousPost, nextPost }` 형태로 반환해 상세 페이지에서 이전/다음 글 링크에 사용합니다.


### 6. API 라우트: `/api/posts`

- 파일: `app/api/posts/route.ts`
- `GET` 요청 시
  - 쿼리 스트링에서 `tag`, `sort`, `startCursor`, `pageSize` 를 파싱
  - `getPublishedPosts` 를 호출해 Notion에서 데이터를 조회
  - JSON 형태로 결과를 반환해 클라이언트에서 React Query로 소비합니다.

---

## 서버 컴포넌트 데이터 패칭 & Suspense 활용

### 1. 홈 페이지 서버 컴포넌트 (`app/page.tsx`)

- `Home` 컴포넌트는 `async` 서버 컴포넌트입니다.
  - `searchParams` 를 `await` 해 선택된 태그/정렬 옵션을 읽어옵니다.
- 서버에서 바로 Notion 데이터를 가져옵니다.
  - `const tags = getTags();`  
    태그 목록 Promise
  - `const postsPromise = getPublishedPosts({ tag: selectedTag, sort: selectedSort });`  
    포스트 목록 Promise
- 이 두 Promise를 즉시 `await` 하지 않고, 아래와 같이 Suspense 경계 안으로 전달합니다.
  - 태그 사이드바
    - `<Suspense fallback={<TagSectionSkeleton />}>`
    - `<TagSectionClient tags={tags} selectedTag={selectedTag} />`
  - 포스트 리스트
    - `<Suspense fallback={<PostListSkeleton />}>`
    - `<PostListSuspense postsPromise={postsPromise} />`

### 2. 클라이언트 컴포넌트에서의 `use()` 활용

React 19에서 도입된 `use()` 훅을 사용해 클라이언트 컴포넌트에서도 서버에서 전달된 Promise를 바로 사용할 수 있습니다.

- 태그 섹션 (`app/_components/TagSection.client.tsx`)
  - props: `tags: Promise<TagFilterItem[]>`
  - 컴포넌트 내부에서 `const allTags = use(tags);` 로 데이터를 해제합니다.
  - Suspense 경계 밖에서는 `TagSectionSkeleton` 이 먼저 보여지고, Promise가 해결되면 실제 태그 목록이 렌더링됩니다.

- 포스트 리스트 (`components/features/blog/PostListSuspense.tsx`)
  - props: `postsPromise: Promise<GetPublishedPostsResponse>`
  - `const initialData = use(postsPromise);` 로 초기 페이지 데이터를 받아옵니다.

### 3. React Query와의 결합 (초기 데이터 + 무한 스크롤)

`PostListSuspense` 컴포넌트에서는 서버에서 준비한 초기 데이터를 React Query에 자연스럽게 연결합니다.

- 초기 데이터 주입
  - `useInfiniteQuery` 호출 시 `initialData` 옵션에 서버에서 가져온 `initialData` 를 넣어줍니다.
  - 이렇게 하면 클라이언트에서 첫 렌더링 때 추가 API 호출 없이 목록이 바로 표시됩니다.
- 이후 페이지 로딩
  - `getNextPageParam` 으로 `nextCursor` 를 반환해 다음 페이지 요청에 사용합니다.
  - `useInView` 로 특정 div가 뷰포트에 들어오면 `fetchNextPage()` 를 호출해 다음 글들을 가져옵니다.
  - 추가 로딩 중에는 "로딩중..." 스피너를 보여줍니다.

이 구조 덕분에:

- 첫 페이지는 서버에서 Notion API를 호출해 SSR/Streaming으로 빠르게 화면에 표시되고,
- 이후 페이지들은 클라이언트에서 React Query와 API 라우트를 통해 점진적으로 가져와 부드러운 무한 스크롤 UX를 제공합니다.

---

## 환경 변수

프로젝트 실행을 위해 다음 환경 변수가 필요합니다.

- `NOTION_TOKEN`: Notion 통합 토큰
- `NOTION_DATABASE_ID`: 블로그 글을 저장하는 Notion 데이터베이스 ID

루트에 `.env.local` 파일을 생성하고 위 값을 설정한 후, 아래 명령어로 개발 서버를 실행할 수 있습니다.

```bash
npm install
npm run dev
```

---

이 README는 기술 스택과 Notion API 기반 블로그 구현 방식, 그리고 서버 컴포넌트/Suspense 활용 구조를 중심으로 프로젝트를 정리한 문서입니다.
