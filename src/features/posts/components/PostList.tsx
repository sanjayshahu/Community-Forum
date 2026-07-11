"use client";

import { useState } from "react";

import PostCard from "./PostCard";
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
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

  if (!data) {
    return <p>No data found.</p>;
  }

  return (
    <div className="space-y-6">

      {/* Posts */}
      {data.data.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        data.data.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))
      )}

      {/* Pagination Info */}
      <div className="text-center text-sm text-gray-600">
        Page {data.pagination.page} of {data.pagination.totalPages}
        <br />
        {data.pagination.totalItems} total posts
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4">

        <button
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          disabled={!data.pagination.hasPreviousPage}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          disabled={!data.pagination.hasNextPage}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}