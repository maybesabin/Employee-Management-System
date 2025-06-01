import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNavigate, useLocation } from "react-router-dom"
import ProtectedRoutes from "@/lib/ProtectedRoutes"
import EmployeeDashboard from "@/pages/EmployeeDashboard"
import EmployerDashboard from "@/pages/EmployerDashboard"
import Homepage from "@/pages/Homepage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "@/components/Navbar"

// Root layout component to handle automatic redirects on initial load
const RootLayout = () => {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (user) {
            if (user.role === "Employee" && location.pathname === "/") {
                navigate("/employee/dashboard", { replace: true })
            } else if (user.role === "Employer" && location.pathname === "/") {
                navigate("/employer/dashboard", { replace: true })
            }
        }
    }, [user, navigate, location.pathname])

    return null
}

const AppRoutes = () => {
    return (
        <Router>
            {location.pathname != "/" && <Navbar />}
            <Routes>
                <Route path="/" element={<><RootLayout /><Homepage /></>} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/employee/dashboard">
                        <Route index element={<EmployeeDashboard />} />
                    </Route>
                    <Route path="/employer/dashboard">
                        <Route index element={<EmployerDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes