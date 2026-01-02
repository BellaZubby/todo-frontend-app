"use client";
import { useTasks } from "../store/tasks";
import { Status } from "../utils/types";

/**
 * Pill button to filter by status. Visible state indicated via background/contrast
 */

const Filters = () => {
  const { statusFilter, setStatusFilter } = useTasks();
  const statuses: Array<Status | "All"> = [
    "All",
    "To-Do",
    "In-Progress",
    "Done",
  ];
  return (
    <div role="group" aria-label="Filter by status" className="flex gap-2">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => setStatusFilter(s)}
          className={`px-3 py-1 rounded-md border ${
            statusFilter === s ? "bg-gray-900 text-white" : "border-gray-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default Filters;
