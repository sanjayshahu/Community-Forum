"use client";

import { useSavePost } from "../hooks/useSavePost";

interface Props {
  postId: string;
  hasSaved?: boolean;
}

export default function BookmarkButton({
  postId,
  hasSaved,
}: Props) {
  const {
    savePost,
    unsavePost,
    isSaving,
    isUnsaving,
  } = useSavePost();

  const handleClick = () => {
    if (hasSaved) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSaving || isUnsaving}
      className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {isSaving || isUnsaving
        ? "Loading..."
        : hasSaved
        ? "Unsave"
        : "Save"}
    </button>
  );
}