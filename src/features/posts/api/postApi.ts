import type { FeedResponse } from "../types";
export async function getPosts(
  page = 1,
  limit = 2
): Promise<FeedResponse> {
  const response = await fetch(
    `/api/posts?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function savePost(postId: string) {
  const response = await fetch(
    `/api/posts/${postId}/save`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save post");
  }

  return response.json();
}

export async function unsavePost(postId: string) {
  const response = await fetch(
    `/api/posts/${postId}/save`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to unsave post");
  }

  return response.json();
}

export async function getSavedPosts(
  page = 1,
  limit = 10
): Promise<FeedResponse> {
  const response = await fetch(
    `/api/saved?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch saved posts");
  }

  return response.json();
}