import { useAuthStore } from "@/store/authStore"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import type { User } from "@/types/user"
import { useForm } from "@tanstack/react-form"

const LoginCard = ({ user }: { user: "Employee" | "Employer" }) => {

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login)
    const storedData = localStorage.getItem(user === "Employee" ? "employees" : "employer");
    const employees = storedData
        ? user === "Employee"
            ? JSON.parse(storedData)
            : [JSON.parse(storedData)]
        : null;

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        onSubmit: async ({ value }) => {
            if (!value.email || !value.password) {
                toast.error("Cannot leave fields empty ❌")
                return
            }
            if (value.email.length < 10) {
                toast.error("Email should be larger than 10 characters.")
                return
            }
            if (value.password.length < 5) {
                toast.error("Password should be larger than 5 characters.")
                return
            }

            // User authentication
            const foundUser = employees?.find(
                (u: User) => u.email === value.email && u.role === user
            );

            if (!foundUser) {
                toast.error("User not found")
                return
            }

            if (foundUser.password !== value.password) {
                toast.error("Passwords do not match ❌")
                return
            }

            // Success
            login(foundUser)
            form.reset()
            toast.success("Logged in successfully ✅")

            if (user === "Employer") {
                navigate("/employer/dashboard")
            } else {
                navigate("/employee/dashboard")
            }
        }
    });

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

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="mt-8 w-full flex flex-col items-start gap-4"
            >
                <form.Field name="email">
                    {(field) => (
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor={field.name} className="md:text-sm text-xs">
                                Email
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="md:text-sm text-xs"
                                placeholder={user === "Employer" ? "admin@company.com" : "employee@company.com"}
                                type="email"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                <form.Field name="password">
                    {(field) => (
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor={field.name} className="md:text-sm text-xs">
                                Password
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="md:text-sm text-xs"
                                placeholder="****************"
                                type="password"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                <form.Subscribe
                    selector={(state) => [state.isSubmitting]}
                >
                    {([isSubmitting]) => (
                        <Button
                            type="submit"
                            className="w-full py-5.5 cursor-pointer"
                            variant="default"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : `Sign in as ${user}`}
                        </Button>
                    )}
                </form.Subscribe>
            </form>
        </div>
    )
}

export default LoginCard