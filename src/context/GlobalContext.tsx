import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import type { Task } from "@/types/task";
import { createContext, useContext, useEffect, useState, type SetStateAction } from "react";

interface GlobalPropsType {
    allTasks: any;
    setAllTasks: React.Dispatch<SetStateAction<() => void>>;
}

//create context
const GlobalContext = createContext<GlobalPropsType | undefined>(undefined);

//create provider
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [allTasks, setAllTasks] = useState<any>({
        all: [],
        completed: [],
        incomplete: [],
        failed: []
    })

    const userEmail = useAuthStore((state) => state.user?.email)
    const setTasks = useTaskStore((state) => state.setTasks);

    useEffect(() => {
        if (userEmail) {
            setTasks(userEmail);
        }
    }, [userEmail, setTasks]);

    const tasks = useTaskStore((state) => state.tasks);

    useEffect(() => {
        setAllTasks({
            all: tasks,
            incomplete: tasks?.filter((t: Task) => (!t.isCompleted && t.isCompleted !== null)),
            completed: tasks?.filter((t: Task) => t.isCompleted),
            failed: tasks?.filter((t: Task) => t.isFailed == true)
        });
    }, [tasks]);
    return (
        <GlobalContext.Provider value={{
            allTasks,
            setAllTasks
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

//custom hook
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalContext must be used withing global provider")
    }
    return context
}