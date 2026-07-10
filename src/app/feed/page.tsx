import PostList from "@/features/posts/components/PostList";

export default function FeedPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Community Feed
      </h1>

      <PostList />
    </main>
  );
}