import SavedList from "@/features/saved/components/SavedList";

export default function SavedPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Saved Posts
      </h1>

      <SavedList />
    </main>
  );
}