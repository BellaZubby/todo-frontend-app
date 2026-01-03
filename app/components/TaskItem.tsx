"use client";

import { useTasks } from "../store/tasks";
import { Task, Status, Priority } from "../utils/types";
import { Trash2 } from "lucide-react";

/**
 * Task row with status/priority controls and deletion action.
 * ARIA labels improve screen-reader navigation
 */

type TaskItemProp = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProp) => {
  const { updateTask, deleteTask } = useTasks();

  const setStatus = (status: Status) => updateTask({ ...task, status });
  const setPriority = (priority: Priority) => updateTask({ ...task, priority });

  return (
    // <li className="py-3 flex items-start justify-between gap-4">
    <li className="pb-2">
      <p className="font-medium">{task.title}</p>
      {/* button and the entries */}
      <div className="flex items-center justify-between gap-1">
        <div className="mt-2 flex gap-2 items-center">
          <label className="text-sm">Status: </label>
          <select
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="rounded-md border border-gray-300 px-1 py-1 text-sm bg-background"
          >
            <option>To-Do</option>
            <option>In-Progress</option>
            <option>Done</option>
          </select>

          <label className="text-sm">Priority:</label>
          <select
            aria-label={`Priority for ${task.title}`}
            value={task.priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-md border border-gray-300 px-1 py-1 text-sm bg-background"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        {/* delete button */}
        <button
          aria-label={`Delete ${task.title}`}
          onClick={() => deleteTask(task.id)}
          className=" text-red-700 cursor-pointer"
        >
          <Trash2 aria-hidden />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
