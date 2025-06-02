import { findUserTasks, getAllEmployees } from "@/store/taskStore";
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
import Popup from "./Popup";
import { useRef, useState } from "react";

const EmployerTable = () => {

    const popupRef = useRef<HTMLDivElement>(null)
    const employees = getAllEmployees()
    const [popupTasks, setPopupTasks] = useState<Task[]>([])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setPopupTasks([])
        }
    }

    return (
        <div className="w-full mt-8">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Tasks</TableHead>
                        <TableHead>Completed Tasks</TableHead>
                        <TableHead>Incomplete Tasks</TableHead>
                        <TableHead>Failed Tasks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees?.map((e: User, idx: number) => (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div ref={popupRef}>
                <Popup tasks={popupTasks} />
            </div>

            {/* Overlay */}
            <div onClick={handleOverlayClick} className={`${(popupTasks.length != 0) ? "visible opacity-60" : "invisible opacity-0"} transition-all duration-300 ease-in-out fixed dark:bg-black bg-white inset-0 w-full h-screen z-40`} />
        </div>
    )
}

export default EmployerTable