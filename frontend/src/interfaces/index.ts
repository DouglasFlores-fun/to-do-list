export interface TaskItem {
    id: number;
    description: string,
    title: string;
    status: boolean;
    dueDate: string; // ISO Date String (e.g., "2025-03-27T00:00:00")
}