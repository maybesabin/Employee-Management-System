import { useAuthStore } from "@/store/authStore"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    return (
        <div className="flex-center">
            <div className="layout py-8 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">
                    Hello
                    <br />
                    <span className="text-4xl first-letter:capitalize">
                        {user?.name.split(" ")[0]} 👋
                    </span>
                </h1>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button
                        onClick={() => {
                            logout()
                            setTimeout(() => {
                                window.location.reload()
                            }, 500)
                        }}
                        variant={"secondary"}
                        className="cursor-pointer md:text-sm text-xs"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar