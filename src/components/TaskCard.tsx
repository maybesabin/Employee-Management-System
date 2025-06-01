import type { Task } from "@/types/task"
import { Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const TaskCard = ({
    title,
}: Partial<Task>) => {

    const [currentTask, setCurrentTask] = useState<Task>()

    useEffect(() => {
        const tasksFromStorage = localStorage.getItem("tasks")
        if (!tasksFromStorage || !title) return

        const parsedTasks: Task[] = JSON.parse(tasksFromStorage)
        const task = parsedTasks.find(
            (t: Task) => t.title.trim().toLowerCase() === title.trim().toLowerCase()
        )

        if (task) {
            setCurrentTask(task)
        }
    }, [title])

    const handleCompleteTask = () => {
        const tasksFromStorage = localStorage.getItem("tasks")
        if (!tasksFromStorage || !currentTask) return

        if (currentTask.isFailed === true && currentTask.isCompleted === null) {
            toast.error("This task is already marked as completed.")
            return

        }

        const parsedTasks: Task[] = JSON.parse(tasksFromStorage)

        const updatedTasks = parsedTasks.map(task =>
            task.title === currentTask.title
                ? {
                    ...task,
                    isCompleted: task.isFailed == null ? true : task.isCompleted,
                }
                : task
        )

        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        window.location.reload()
    }

    const handleFailTask = () => {
        const tasksFromStorage = localStorage.getItem("tasks")
        if (!tasksFromStorage || !currentTask) return

        if (currentTask.isFailed === true && currentTask.isCompleted === null) {
            toast.error("This task is already marked as failed.")
            return

        }
        const parsedTasks: Task[] = JSON.parse(tasksFromStorage)

        const updatedTasks = parsedTasks.map(task =>
            task.title === currentTask.title
                ? {
                    ...task,
                    isFailed: true,
                    isCompleted: null
                }
                : task
        )

        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        window.location.reload()
    }

    return (
        <div className="w-full border flex flex-col items-start justify-between gap-2 rounded-md p-4 h-52">
            <div className="w-full flex items-center justify-between">
                <h3 className="md:text-xl text-base font-medium">
                    {currentTask?.title}
                </h3>
            </div>
            <p className="dark:text-neutral-400 text-neutral-800 md:text-sm text-xs">
                {currentTask?.description}
            </p>
            <div className="mt-1 flex items-center gap-2 dark:text-neutral-400 text-neutral-800 text-xs">
                <Calendar className="size-3" />
                <span>Due: {currentTask?.date}</span>
            </div>
            <div className="w-full flex md:flex-row flex-col items-center gap-2 mt-2">
                {!currentTask?.isFailed &&
                    <Button
                        className={`${currentTask?.isCompleted ? "w-full" : "md:w-1/2 w-full"}`}
                        onClick={handleCompleteTask}
                        variant={!currentTask?.isCompleted ? "default" : "secondary"}
                    >
                        {!currentTask?.isCompleted ? "Mark as completed" : "Completed ✅"}
                    </Button>
                }
                {!currentTask?.isCompleted &&
                    <Button
                        className={`${currentTask?.isFailed ? "w-full" : "md:w-1/2 w-full"}`}
                        onClick={handleFailTask}
                        variant={!currentTask?.isFailed ? "secondary" : "outline"}
                    >
                        {!currentTask?.isFailed ? "Mark as failed" : "Failed ❌"}
                    </Button>
                }
            </div>
        </div>
    )
}

export default TaskCard
