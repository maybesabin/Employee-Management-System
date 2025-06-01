import type { Task } from "@/types/task"
import { create } from "zustand"

type TaskType = {
    tasks: Task[] | null;
    setTasks: (userEmail: string) => void;
}

export const useTaskStore = create<TaskType>((set) => ({
    tasks: null,

    setTasks: (userEmail: string) => {
        const storedTasks = localStorage.getItem("tasks")
        const savedTasks = storedTasks ? JSON.parse(storedTasks) : null
        const userTasks = savedTasks.filter((task: Task) => task.userEmail === userEmail)
        set({ tasks: userTasks })
    }
}))