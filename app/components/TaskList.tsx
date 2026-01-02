"use client";

import TaskItem from "./TaskItem";
import { Task } from "../utils/types";

type TaskListProp = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProp) => {
  return (
    <ul className="divide-y divide-gray-200" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
