import type { Task } from "@/types/task";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const TasksPopup = ({
    tasks
}: {
    tasks: Task[]
}) => {

    const handleDeleteTask = (title: string) => {
        const storedTasks = localStorage.getItem("tasks")
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []
        const updatedTasks = parsedTasks?.filter((t: Task) => t.title !== title);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        toast.success(`Deleted task (${title})`)
    }

    return (
        <div className={`${(tasks.length != 0) ? "visible scale-100 blur-none" : "invisible scale-75 blur-md"} transition-all duration-300 ease-in-out fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-lg p-4 dark:bg-black bg-white md:min-w-96 min-w-[85%] z-50`}>
            <div className="flex flex-col items-start gap-4">
                {tasks?.map((t: Task, idx: number) => (
                    <div key={idx} className="md:text-sm text-xs flex items-center md:gap-12 gap-8 justify-between w-full">
                        <div className="flex items-center gap-2">
                            <span className="md:text-xl text-base dark:bg-neutral-800 bg-neutral-100 dark:text-white text-neutral-600 md:size-10 size-8 rounded-full flex items-center justify-center">
                                {idx + 1}.
                            </span>
                            <div>
                                <h3 className="font-medium md:text-sm text-xs">{t.title}</h3>
                                <h4 className="md:text-xs text-[9px]">{t.description}</h4>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleDeleteTask(t.title)}
                            size={'icon'}
                            variant={"destructive"}
                            className="text-xs">
                            <Trash />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TasksPopup