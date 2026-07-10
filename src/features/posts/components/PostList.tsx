"use client";

import PostCard from "./PostCard";
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
  const {
    data,
    isLoading,
    error,
  } = usePosts();

  if (isLoading)
    return <p>Loading...</p>;

  if (error)
    return <p>Something went wrong.</p>;

  return (
    <div className="space-y-4">
      {data?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}