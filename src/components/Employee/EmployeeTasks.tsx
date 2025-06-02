import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeCard from "../EmployeeCard";
import type { Task } from "@/types/task";
import { useGlobalContext } from "@/context/GlobalContext";

const EmployeeTasks = () => {

    const { allTasks } = useGlobalContext()

    return (
        <div className="w-full mt-8">
            {/* Tasks */}
            <h2 className="font-semibold md:text-xl text-base">My Tasks</h2>
            <Tabs defaultValue="all" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-4 gap-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
                    <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="task-container">
                    {allTasks.all.map((item: Task, idx: number) => (
                        <EmployeeCard
                            key={idx}
                            title={item.title}
                        />
                    ))}
                </TabsContent>
                <TabsContent value="incomplete" className="task-container">
                    {allTasks.incomplete.map((item: Task, idx: number) => (
                        <EmployeeCard
                            key={idx}
                            title={item.title}
                        />
                    ))}
                </TabsContent>
                <TabsContent value="completed" className="task-container">
                    {allTasks.completed.map((item: Task, idx: number) => (
                        <EmployeeCard
                            key={idx}
                            title={item.title}
                        />
                    ))}
                </TabsContent>
                <TabsContent value="failed" className="task-container">
                    {allTasks.failed.map((item: Task, idx: number) => (
                        <EmployeeCard
                            key={idx}
                            title={item.title}
                        />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EmployeeTasks