"use client";

import BookmarkButton from "./BookMarkButton";

interface Props {
  post: any;//testing
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
  hasSaved={post.hasSaved}
/>
      </div>

         <small>
            {new Date(post.createdAt).toLocaleString()}
          </small>

    </div>
  );
}