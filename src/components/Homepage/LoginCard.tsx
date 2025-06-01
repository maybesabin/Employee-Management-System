import { useAuthStore } from "@/store/authStore"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import type { User } from "@/types/user"

const LoginCard = ({ user }: { user: "Employee" | "Employer" }) => {

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login)
    const storedData = localStorage.getItem(user === "Employee" ? "employees" : "employer");
    const employees = storedData
        ? user === "Employee"
            ? JSON.parse(storedData)
            : [JSON.parse(storedData)]
        : null;

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: user
    })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (!userData.email || !userData.password) return toast.error("Cannot leave fields empty ❌")
        if (userData.email.length < 10) return toast.error("Email should be larger than 10 characters.")
        if (userData.password.length < 5) return toast.error("Password should be larger than 5 characters.")

        const foundUser = employees?.find(
            (u: User) => u.email === userData.email && u.role === userData.role
        );

        if (!foundUser) {
            return toast.error("User not found")
        }

        if (foundUser.password !== userData.password) {
            return toast.error("Passwords do not match ❌")
        }
        login(foundUser)
        setUserData({
            name: "",
            email: "",
            password: "",
            role: user
        })
        toast.success("Logged in successfully ✅")
        if (user == "Employer") {
            navigate("/employer/dashboard")
        } else {
            navigate("/employee/dashboard")
        }
    }

    return (
        <div className="lg:w-[500px] w-full mt-2 md:text-sm text-xs border rounded-md p-4">
            <h2 className="md:text-lg text-base font-medium">{user} Login</h2>
            <p className="dark:text-neutral-400 text-neutral-800 text-xs">
                {user == "Employer" ?
                    "Sign in to manage your team and assign tasks."
                    :
                    "Sign in to view and manage your assigned tasks."
                }
            </p>

            <form onSubmit={handleLogin} className="mt-8 w-full flex flex-col items-start gap-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className="md:text-sm text-xs">Email</Label>
                    <Input
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        value={userData.email}
                        className="md:text-sm text-xs"
                        placeholder={user == "Employer" ? "admin@company.com" : "employee@company.com"}
                        type="email"
                        name="email"
                        required
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className="md:text-sm text-xs">Password</Label>
                    <Input
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        value={userData.password}
                        className="md:text-sm text-xs"
                        placeholder="****************"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full py-5.5 cursor-pointer"
                    variant={"default"}
                >
                    Sign in as {user}
                </Button>
            </form>
        </div>
    )
}

export default LoginCard