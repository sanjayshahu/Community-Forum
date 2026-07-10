"use client";

import { useSavedPosts } from "../hooks/useSavedPosts";

export default function SavedList() {

  const {
    data,
    isLoading,
  } = useSavedPosts();

  if (isLoading)
    return <p>Loading...</p>;

  if (!data?.length)
    return <p>No saved posts.</p>;

  return (
    <div className="space-y-4">

      {data.map((saved) => (

        <div
          key={saved.id}
          className="border p-5 rounded"
        >
          {saved.post.title}
        </div>

      ))}

    </div>
  );
}