import { useEffect } from "react"
import Route from "./routes/route"
import { useAuthStore } from "./store/authStore"

const App = () => {
  const initializeUser = useAuthStore((state) => state.initializeUser)

  useEffect(() => {
    initializeUser()
  }, [])

  return (
    <div>
      <Route />
    </div>
  )
}

export default App