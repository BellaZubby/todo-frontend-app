// defining task types
export type Priority = "Low" | "Medium" | "High"; // union types
export type Status = "To-Do" | "In-Progress" | "Done";

export interface Task {
    id: string;
    title: string;
    priority: Priority;
    status: Status;
    createdAt: string;
    updatedAt: string;
}