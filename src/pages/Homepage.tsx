import { CircleCheckBig, ClipboardCheck, Users } from "lucide-react"
import Login from "../components/Homepage/Login"

const Homepage = () => {
    const features = [
        { icon: ClipboardCheck, title: "Task Management", description: "Assign, track and manage tasks efficiently" },
        { icon: CircleCheckBig, title: "Performance Tracking", description: "Monitor employee progress and productivity" },
        { icon: Users, title: "Team Collaboration", description: "Enhance communication and teamwork" },
    ]

    return (
        <div className="flex lg:flex-row flex-col items-center justify-center w-full">

            {/* Left Side */}
            <div className="lg:w-1/2 w-full lg:h-[100svh] flex flex-col lg:items-start items-center justify-center gap-4 p-8">
                <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold lg:text-left text-center">
                    Streamline your team's productivity
                </h1>
                <p className="lg:text-base text-sm w-4/5 dark:text-neutral-400 text-neutral-600 lg:text-left text-center">
                    Manage tasks, track progress, and boost collaboration with our comprehensive
                    employee management system.
                </p>

                <div className="grid lg:grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-0 gap-4">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 pt-8"
                        >
                            <feature.icon
                                className="rounded-full dark:bg-white bg-neutral-200 text-black lg:p-2 p-1.5 lg:h-9 lg:w-9 w-7 h-7"
                            />
                            <div>
                                <h4 className="font-medium lg:text-base text-sm">
                                    {feature.title}
                                </h4>
                                <p className="dark:text-neutral-400 text-neutral-600 lg:text-sm text-xs">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <Login />
        </div>
    )
}

export default Homepage