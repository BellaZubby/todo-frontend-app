"use client";
// For task creation

import { useState } from "react";
import { useTasks } from "../store/tasks";
import { Priority } from "../utils/types";

/**
 * Form to add a new task with title and priority.
 * Prevents empty titles and resets after submit.
 */

const TaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    addTask(title, priority);
    setTitle("");
    setPriority("Medium");
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Add task"
      className="grid gap-2 sm:grid-cols-3"
    >
      <div className="sm:col-span-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-background text-foreground"
          placeholder="Enter task title..."
        />
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="priority" className="block text-sm font-medium">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-background text-foreground"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="sm:col-span-3">
        <button
          type="submit"
          className="mt-2 inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
