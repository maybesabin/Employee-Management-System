import Login from "../components/Homepage/Login"

const Homepage = () => {

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100svh]">

            <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
                <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold text-center">
                    Streamline your team's productivity
                </h1>
                <p className="lg:text-base text-sm lg:w-4/5 dark:text-neutral-400 text-neutral-600 text-center">
                    Manage tasks, track progress, and boost collaboration with our comprehensive
                    employee management system.
                </p>
            </div>

            <Login />
        </div>
    )
}

export default Homepage