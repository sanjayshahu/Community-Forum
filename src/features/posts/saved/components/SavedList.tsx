"use client";

import { useSavedPosts } from "../hooks/useSavedPosts";
import PostCard from "@/features/posts/components/PostCard";
import { EmptyState } from "../components/EmptyState";

export function SavedList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSavedPosts();

  if (isLoading) {
    return <div className="p-4 text-center">Loading saved posts…</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Failed to load saved posts.</div>;
  }

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (posts.length === 0) {
    return (
      <EmptyState
        title="No saved posts"
        description="You haven't saved any posts yet. Browse the feed and save posts you want to read later."
      />
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}