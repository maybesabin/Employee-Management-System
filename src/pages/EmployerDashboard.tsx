import DashboardCard from "@/components/DashboardCard"
import EmployerTable from "../components/Employer/EmployerTable"
import { getAllSavedTasks } from "@/store/taskStore"
import type { Task } from "@/types/task"
import { BadgeCheckIcon, CheckCircleIcon, PencilIcon, XCircleIcon } from "lucide-react"

const EmployerDashboard = () => {

    const tasks = getAllSavedTasks()

    return (
        <div className="flex-center relative">

            <div className="layout">
                {/* Cards */}
                <div className="card-container">
                    <DashboardCard
                        title="Total Tasks"
                        value={tasks?.length || 0}
                        icon={CheckCircleIcon}
                    />
                    <DashboardCard
                        title="Completed Tasks"
                        value={tasks?.filter((t: Task) => t.isCompleted).length || 0}
                        icon={BadgeCheckIcon}
                    />
                    <DashboardCard
                        title="Incomplete Tasks"
                        value={tasks?.filter((t: Task) => !t.isCompleted).length || 0}
                        icon={PencilIcon}
                    />
                    <DashboardCard
                        title="Failed Tasks"
                        value={tasks?.filter((t: Task) => t.isFailed).length || 0}
                        icon={XCircleIcon}
                    />
                </div>

                {/* Tasks */}
                <EmployerTable />
            </div>
        </div>
    )
}

export default EmployerDashboard