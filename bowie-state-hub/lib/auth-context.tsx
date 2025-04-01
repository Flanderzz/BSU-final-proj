"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user type
type User = {
  id: number
  name: string
  email: string
  role: string
  major?: string
  graduationYear?: number
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      const storedUser = localStorage.getItem("user")

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("auth_token")
          localStorage.removeItem("user")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error || "Invalid credentials" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  // Signup function
  const signup = async (userData: any) => {
    try {
      // In a real app, you would call an API endpoint
      // For this demo, we'll simulate a successful signup

      // Create a fake user
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: userData.name,
        email: userData.email,
        role: userData.role || "student",
        major: userData.major,
        graduationYear: userData.graduationYear,
      }

      // Create a fake token
      const token = `fake-jwt-token-${Date.now()}`

      // Store token and user data
      localStorage.setItem("auth_token", token)
      localStorage.setItem("user", JSON.stringify(newUser))
      setUser(newUser)

      return { success: true }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// HOC to protect routes
export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login")
      }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }
}

