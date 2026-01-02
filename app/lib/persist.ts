// localStorage helpers
import { Task } from "../utils/types";

const KEY = "tasks: v1";

/**
 * Reads tasks from localStorage. Returns [] if not available or malformed.
 * Using try/catch avoids crashing on storage errors
 */

export const loadTasks = ():Task[] => {
    if (typeof window === "undefined") return [];

    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
        return [];
    }
}

/**
 * Writes tasks to localStorage. Silently fails if storage is unavailable.
 */

export const saveTasks = (tasks: Task[]) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
        // No-op: we still keep state in memory if persistence fails
    }
}