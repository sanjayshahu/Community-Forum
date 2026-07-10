"use client";

import BookmarkButton from "./BookmarkButton";

interface Props {
  post: any;
}

export default function PostCard({
  post,
}: Props) {
  return (
    <div className="border rounded-lg p-5 shadow-sm">

      <h2 className="text-xl font-semibold">
        {post.title}
      </h2>

      <p className="mt-3">
        {post.content}
      </p>

      <div className="mt-5">
        <BookmarkButton
          postId={post.id}
        />
      </div>

    </div>
  );
}