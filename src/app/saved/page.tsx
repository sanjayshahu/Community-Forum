import {SavedList} from "../../features/posts/saved/components/SavedList";

export default function SavedPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>
      <SavedList />
    </div>
  );
}