// displays a friendly message when task list is empty

const EmptyState = () => {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center bg-background">
      <p className="text-lg font-medium">No tasks yet</p>
      <p className="mt-2 text-sm text-gray-600">
        Add your first task and start tracking your day.
      </p>
    </div>
  );
};

export default EmptyState;
