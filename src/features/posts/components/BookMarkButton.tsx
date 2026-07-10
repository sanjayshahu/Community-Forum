"use client";

import { useSavePost } from "../hooks/useSavePost";

interface Props {
  postId: string;
}

export default function BookmarkButton({
  postId,
}: Props) {

  const mutation = useSavePost();

  return (
    <button
      onClick={() =>
        mutation.mutate(postId)
      }
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Save
    </button>
  );
}