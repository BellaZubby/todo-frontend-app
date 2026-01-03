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

  // Map each status to a color scheme
  const colors: Record<Status | "All", string> = {
    All: "bg-gray-200 text-gray-800",
    "To-Do": "bg-red-200 text-red-800",
    "In-Progress": "bg-yellow-200 text-yellow-800",
    Done: "bg-green-200 text-green-800",
  };

  const activeBorders: Record<Status | "All", string> = {
    All: "border-gray-500",
    "To-Do": "border-red-600",
    "In-Progress": "border-yellow-600",
    Done: "border-green-600",
  };

  return (
    <div role="group" aria-label="Filter by status" className="flex gap-2">
      {statuses.map((s) => {
        const isActive = statusFilter === s;
        return (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-md border transition-colors ${
              colors[s]
            } ${isActive ? activeBorders[s] + "border-2" : "border-gray-300"}`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
