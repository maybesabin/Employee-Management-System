import DashboardCard from "@/components/DashboardCard";
import { BadgeCheckIcon, CheckCircleIcon, PencilIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios"
import EmployeeTasks from "@/components/Employee/EmployeeTasks";
import { useGlobalContext } from "@/context/GlobalContext";

const EmployeeDashboard = () => {

    const [quote, setQuote] = useState({ quote: "", author: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { allTasks } = useGlobalContext()

    async function fetchQuote() {
        setLoading(true)
        try {
            const res = await axios.get("https://api.quotable.io/random?tags=motivational")
            setQuote({ quote: res.data.content, author: res.data.author })
            setLoading(false)
        } catch (error: any) {
            console.log(error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <div className="flex-center">
            <div className="layout">
                {!loading && !error &&
                    <h3 className="text-xs mb-8">
                        <span className="italic dark:text-neutral-400 text-neutral-800">
                            {quote.quote} -&nbsp;
                        </span>
                        {quote.author}
                    </h3>
                }

                {/* Cards */}
                <div className="card-container">
                    <DashboardCard
                        title="All Tasks"
                        value={allTasks.all?.length || 0}
                        icon={CheckCircleIcon}
                    />
                    <DashboardCard
                        title="Completed Tasks"
                        value={allTasks.completed?.length || 0}
                        icon={BadgeCheckIcon}
                    />
                    <DashboardCard
                        title="Incomplete Tasks"
                        value={allTasks.incomplete.length || 0}
                        icon={PencilIcon}
                    />
                    <DashboardCard
                        title="Failed Tasks"
                        value={allTasks.failed?.length || 0}
                        icon={XCircleIcon}
                    />
                </div>

                {/* Tasks */}
                <EmployeeTasks />
            </div>
        </div >
    );
};

export default EmployeeDashboard;
