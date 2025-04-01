"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"

export default function SignUp() {
  const router = useRouter()
  const { toast } = useToast()
  const { signup, isAuthenticated, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    major: "",
    graduationYear: "",
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

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await signup(formData)

      if (result.success) {
        toast({
          title: "Account created",
          description: "Welcome to BSU Student Hub!",
        })
        router.push("/")
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "Failed to create account",
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
            <h1 className="text-2xl font-bold">Sign Up for BSU Student Hub</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
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
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="club_leader">Club Leader</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Major
              </label>
              <Input
                type="text"
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                Graduation Year
              </label>
              <Input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="2025"
              />
            </div>
            <Button type="submit" className="w-full bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              Sign up with BSU Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

