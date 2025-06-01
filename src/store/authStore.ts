import type { User } from "@/types/user";
import { create } from "zustand"

type AuthState = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    initializeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    login: (user) => {
        localStorage.setItem("user", JSON.stringify(user))
        set({ user, })
    },

    logout: () => {
        localStorage.removeItem("user")
        set({ user: null })
    },

    initializeUser: () => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            set({ user: JSON.parse(storedUser) })
        }
    }
}))