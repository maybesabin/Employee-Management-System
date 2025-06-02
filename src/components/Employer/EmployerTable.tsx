import { findUserTasks } from "@/store/taskStore";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/user";
import type { Task } from "@/types/task";
import TasksPopup from "./TasksPopup";
import { useRef, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/GlobalContext";

const EmployerTable = () => {

    const popupRef = useRef<HTMLDivElement>(null)
    const { allEmployees, getAllEmployees } = useGlobalContext()
    const [popupTasks, setPopupTasks] = useState<Task[]>([])
    const [showCreateEmployee, setShowCreateEmployee] = useState(false)

    const handleDeleteUser = (userEmail: string) => {
        const storedEmployees = localStorage.getItem("employees");
        if (!storedEmployees) {
            toast.error("No employees found.");
            return;
        }
        const parsedEmployees = JSON.parse(storedEmployees);
        const updatedEmployees = parsedEmployees.filter((emp: any) => emp.email !== userEmail);

        if (parsedEmployees.length === updatedEmployees.length) {
            toast.error("Employee not found.");
            return;
        }

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        toast.success("Employee deleted successfully!");
        getAllEmployees()
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setPopupTasks([]);
            setShowCreateEmployee(false);
        }
    };

    const showOverlay = popupTasks.length !== 0 || showCreateEmployee;

    return (
        <div className="w-full">
            <Button
                onClick={() => setShowCreateEmployee(!showCreateEmployee)}
                className="my-6 flex items-center gap-2 md:text-sm text-xs"
            >
                <span>Create Employee</span>
                <Plus className="size-4" />
            </Button>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Tasks</TableHead>
                        <TableHead>Completed Tasks</TableHead>
                        <TableHead>Incomplete Tasks</TableHead>
                        <TableHead>Failed Tasks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allEmployees?.map((e: User, idx: number) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{idx + 1}</TableCell>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>{e.email}</TableCell>
                            <TableCell
                                className="hover:underline cursor-pointer"
                                onClick={() => setPopupTasks(findUserTasks(e.email))}
                            >
                                {findUserTasks(e.email)?.length ?? 0}
                            </TableCell>
                            <TableCell
                                className="hover:underline cursor-pointer"
                                onClick={() => setPopupTasks(findUserTasks(e.email)?.filter((t: Task) => t.isCompleted))}
                            >
                                {findUserTasks(e.email)?.filter((t: Task) => t.isCompleted).length ?? 0}
                            </TableCell>
                            <TableCell
                                className="hover:underline cursor-pointer"
                                onClick={() => setPopupTasks(findUserTasks(e.email)?.filter((t: Task) => !t.isCompleted))}
                            >
                                {findUserTasks(e.email)?.filter((t: Task) => !t.isCompleted).length ?? 0}
                            </TableCell>
                            <TableCell
                                className="hover:underline cursor-pointer"
                                onClick={() => setPopupTasks(findUserTasks(e.email)?.filter((t: Task) => t.isFailed))}
                            >
                                {findUserTasks(e.email)?.filter((t: Task) => t.isFailed).length ?? 0}
                            </TableCell>
                            <TableCell onClick={() => {
                                handleDeleteUser(e.email)
                            }}>
                                <Button size={"icon"} variant={"destructive"}><Trash className="size-3" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div ref={popupRef}>
                <TasksPopup tasks={popupTasks} />
            </div>

            <div ref={popupRef}>
                <CreateEmployee
                    setShowCreateEmployee={setShowCreateEmployee}
                    showCreateEmployee={showCreateEmployee}
                />
            </div>

            {/* Overlay */}
            <div
                onClick={handleOverlayClick}
                className={`${showOverlay ? "visible opacity-60" : "invisible opacity-0"} transition-all duration-300 ease-in-out fixed dark:bg-black bg-white inset-0 w-full h-screen z-40`}
            />
        </div>
    )
}

export default EmployerTable