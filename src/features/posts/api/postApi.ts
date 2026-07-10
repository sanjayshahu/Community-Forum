export async function getPosts() {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function savePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}/save`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to save post");
  }

  return response.json();
}

export async function unsavePost(postId: string) {
  const response = await fetch(`/api/posts/${postId}/save`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to unsave post");
  }

  return response.json();
}