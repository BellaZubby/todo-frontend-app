// setting up store with Zustand
import {create} from "zustand";
import type { Task, Priority, Status } from "../utils/types";
import { loadTasks, saveTasks } from "../lib/persist";

type State = {
    tasks: Task[];
    search: string;
    statusFilter: Status | "All";
};

type Actions = {
    hydrate: () => void;
    setSearch: (q: string) => void;
    setStatusFilter: (s: State["statusFilter"]) => void;
    addTask: (title: string, priority: Priority) => void;
    updateTask: (updated: Task) => void;
    deleteTask: (id: string) => void;
    clearAll: () => void;
}

/**
 * centralized task store:
 * - Minimal API for CRUD
 * - Persist on each mutation
 * - Separate filters/search from raw tasks
 */

export const useTasks = create<State & Actions>((set, get) => ({
    tasks: [],
    search: "",
    statusFilter: "All",

    // Load persisted tasks into memory on first mount
    hydrate: () => {
        const t = loadTasks();
        set({tasks: t});
    },

    setSearch: (q) => set({search: q}),
    setStatusFilter: (s) => set({statusFilter: s}),

    // create a new task with default status To-Do and timestamps.
    addTask: (title, priority) => {
        const now = new Date().toISOString();
        const task: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            priority,
            status: "To-Do",
            createdAt: now,
            updatedAt: now,
        };

    const tasks = [task, ...get().tasks];
    saveTasks(tasks);
    set({tasks})
    },

    // update an existing task; refresh updatedAt automatically.
    updateTask: (updated) => {
        const tasks = get().tasks.map((t) => 
            t.id === updated.id ? {...updated, updatedAt: new Date().toISOString()} : t
        );
        saveTasks(tasks);
        set({tasks});
    },

    // Remove a task by id
    deleteTask: (id) => {
        const tasks = get().tasks.filter((t) => t.id !== id);
        saveTasks(tasks);
        set({tasks});
    },

    // clear all tasks (used for reset).
    clearAll: () => {
        saveTasks([]);
        set({tasks: []});
    },
}));