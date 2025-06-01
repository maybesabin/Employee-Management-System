import { useAuthStore } from "@/store/authStore"
import { Outlet, Navigate, useLocation } from "react-router-dom"

const ProtectedRoutes = () => {
    const user = useAuthStore((state) => state.user)
    const location = useLocation()
    const path = location.pathname

    // If no user is logged in, redirect to homepage
    if (!user) {
        return <Navigate to="/" replace />
    }

    if (user.role === "Employee") {
        if (!path.startsWith("/employee")) {
            return <Navigate to="/employee/dashboard" replace />
        }
    } else if (user.role === "Employer") {
        if (!path.startsWith("/employer")) {
            return <Navigate to="/employer/dashboard" replace />
        }
    }

    return <Outlet />
}

export default ProtectedRoutes