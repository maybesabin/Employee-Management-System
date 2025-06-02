import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";
import { createContext, useContext, useEffect, useState, type SetStateAction } from "react";

interface GlobalPropsType {
    allTasks: {
        all: Task[] | null;
        completed: Task[] | null;
        incomplete: Task[] | null;
        failed: Task[] | null;
    };
    setAllTasks: React.Dispatch<SetStateAction<{
        all: Task[] | null;
        completed: Task[] | null;
        incomplete: Task[] | null;
        failed: Task[] | null;
    }>>;
    getAllEmployees: () => void;
    allEmployees: User[] | null;
}

//create context
const GlobalContext = createContext<GlobalPropsType | undefined>(undefined);

//create provider
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [allEmployees, setAllEmployees] = useState<User[] | null>(null);
    const [allTasks, setAllTasks] = useState<{
        all: Task[] | null;
        completed: Task[] | null;
        incomplete: Task[] | null;
        failed: Task[] | null;
    }>({
        all: null,
        completed: null,
        incomplete: null,
        failed: null
    });

    const userEmail = useAuthStore((state) => state.user?.email);
    const setTasks = useTaskStore((state) => state.setTasks);

    useEffect(() => {
        if (userEmail) {
            setTasks(userEmail);
        }
    }, [userEmail, setTasks]);

    const tasks = useTaskStore((state) => state.tasks);

    const getAllEmployees = () => {
        const storedEmployees = localStorage.getItem("employees");
        setAllEmployees(storedEmployees ? JSON.parse(storedEmployees) : null);
    };

    useEffect(() => {
        setAllTasks({
            all: tasks,
            incomplete: tasks?.filter((t: Task) => (!t.isCompleted && t.isCompleted !== null)) ?? null,
            completed: tasks?.filter((t: Task) => t.isCompleted) ?? null,
            failed: tasks?.filter((t: Task) => t.isFailed === true) ?? null
        });
        getAllEmployees()
    }, [tasks]);

    return (
        <GlobalContext.Provider value={{
            allTasks,
            setAllTasks,
            getAllEmployees,
            allEmployees
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

//custom hook
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within GlobalProvider");
    }
    return context;
};