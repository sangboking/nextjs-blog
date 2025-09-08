"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PostCard } from "@/components/features/blog/PostCard";
import { Post } from "@/types/blog";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid gap-4">
      {posts.map((post, i) => (
        <Link href={`/blog/${post.slug}`} key={post.id}>
          <PostCard post={post} isFirst={i === 0} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
