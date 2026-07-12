"use client";

import { useSavePost } from "../hooks/useSavePost";

interface BookmarkButtonProps {
  postId: string;
  hasSaved: boolean;
  savesCount: number;
}

export default function BookmarkButton({
  postId,
  hasSaved,
  savesCount,
}: BookmarkButtonProps) {
  const { savePost, unsavePost, isSaving, isUnsaving } = useSavePost();

  const isLoading = isSaving || isUnsaving;

  const handleToggle = () => {
    if (hasSaved) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          hasSaved
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Saving..." : hasSaved ? "Saved" : "Save"}
      </button>
      <span className="text-sm text-gray-600">
        {savesCount} {savesCount === 1 ? "save" : "saves"}
      </span>
    </div>
  );
}