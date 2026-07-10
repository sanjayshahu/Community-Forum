interface Props {
  title: string;
}

export default function EmptyState({
  title,
}: Props) {

  return (
    <div className="text-center py-20">

      <h2 className="text-xl">
        {title}
      </h2>

    </div>
  );
}