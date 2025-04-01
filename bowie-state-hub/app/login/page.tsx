"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back to BSU Student Hub!",
        })
        router.push("/")
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  // If already authenticated, this will redirect, but we'll return null just in case
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow bg-yellow-400 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Login to BSU Student Hub</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@bsu.edu"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="#" className="text-sm text-black hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-black font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              Sign in with BSU Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

