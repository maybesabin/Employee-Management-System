import type { Task } from "@/types/task"
import { create } from "zustand"

type TaskType = {
    tasks: Task[] | null;
    setTasks: (userEmail: string) => void;
    savedTasks: Task[] | null;
}

export const getAllSavedTasks = () => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : null
}

export const findUserTasks = (userEmail: string) => {
    const savedTasks = getAllSavedTasks();
    const userTasks = savedTasks ? savedTasks.filter((task: Task) => task.userEmail === userEmail) : null
    return userTasks
}

export const useTaskStore = create<TaskType>((set) => ({
    tasks: null,
    savedTasks: null,
    setTasks: (userEmail: string) => {
        const savedTasks = getAllSavedTasks()
        const userTasks = savedTasks ? savedTasks.filter((task: Task) => task.userEmail === userEmail) : null
        set({ tasks: userTasks, savedTasks })
    }
}))