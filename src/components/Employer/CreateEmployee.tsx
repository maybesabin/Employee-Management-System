import { useState, type SetStateAction } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

type PropsType = {
    showCreateEmployee: boolean;
    setShowCreateEmployee: React.Dispatch<SetStateAction<boolean>>
}

const CreateEmployee = ({
    showCreateEmployee,
    setShowCreateEmployee
}: PropsType) => {

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            tasks: []
        },
        onSubmit: async ({ value }) => {
            if (!value.name || !value.email || !value.password || !value.confirmPassword) {
                toast.error("Please provide all fields.")
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

            if (value.password !== value.confirmPassword) {
                toast.error("Passwords do not match")
                return
            }

            const storedEmployees = localStorage.getItem("employees")
            const parsedEmployees = storedEmployees ? JSON.parse(storedEmployees) : []

            const exists = parsedEmployees.some((emp: any) => emp.email === value.email)
            if (exists) {
                toast.error("Employee with this email already exists")
                return
            }

            const newEmployee = {
                name: value.name,
                email: value.email,
                password: value.password,
                tasks: value.tasks
            }

            const updatedEmployees = [...parsedEmployees, newEmployee]
            localStorage.setItem("employees", JSON.stringify(updatedEmployees))
            toast.success("Employee created successfully!")
            form.reset()
            setShowCreateEmployee(false)
        }
    })

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })

    return (
        <div className={`${showCreateEmployee ? "visible scale-100 blur-none" : "invisible scale-75 blur-md"} transition-all duration-300 ease-in-out fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-lg p-4 dark:bg-black bg-white md:min-w-[30rem] min-w-[85%] z-50`}>

            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="grid w-full items-center gap-2"
            >
                {/* Name */}
                <form.Field name="name">
                    {(field) => (
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor={field.name} className="md:text-sm text-xs">
                                Name
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="md:text-sm text-xs"
                                placeholder="John Doe"
                                type="text"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                {/* Email */}
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
                                placeholder="employee@gmail.com"
                                type="email"
                                required
                            />
                        </div>
                    )}
                </form.Field>

                {/* Password */}
                <form.Field name="password">
                    {(field) => (
                        <div className="grid w-full items-center gap-1.5 relative">
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
                                placeholder="**********"
                                type={showPassword.password ? "text" : "password"}
                                required
                            />
                            <div
                                className="absolute right-2 top-9"
                                onClick={() => setShowPassword(prev => ({ ...prev, password: !showPassword.password }))}
                            >
                                {showPassword.password ?
                                    <EyeOff className="size-4.5 " /> :
                                    <Eye className="size-4.5 " />
                                }
                            </div>
                        </div>
                    )}
                </form.Field>

                {/* Confirm Password */}
                <form.Field name="confirmPassword">
                    {(field) => (
                        <div className="grid w-full items-center gap-1.5 relative">
                            <Label htmlFor={field.name} className="md:text-sm text-xs">
                                Confirm Password
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="md:text-sm text-xs"
                                placeholder="**********"
                                type={showPassword.confirmPassword ? "text" : "password"}
                                required
                            />
                            <div
                                className="absolute right-2 top-9"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !showPassword.confirmPassword }))}
                            >
                                {showPassword.confirmPassword ?
                                    <EyeOff className="size-4.5 " /> :
                                    <Eye className="size-4.5 " />
                                }
                            </div>
                        </div>
                    )}
                </form.Field>

                <form.Subscribe>
                    <Button variant={"secondary"} className="mt-3">
                        Create
                    </Button>
                </form.Subscribe>
            </form>
        </div>
    )
}

export default CreateEmployee