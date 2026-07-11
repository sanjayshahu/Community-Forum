"use client";

import { useState } from "react";

import PostCard from "./PostCard";
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
  // Current page
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error,
  } = usePosts(page);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="space-y-4">
      {data?.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        data.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}