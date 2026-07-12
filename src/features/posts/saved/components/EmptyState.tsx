interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">📖</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
}