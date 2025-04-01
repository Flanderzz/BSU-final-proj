"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    graduationYear: "",
    interests: "",
    clubs: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        major: user.major || "",
        graduationYear: user.graduationYear?.toString() || "",
        interests: "",
        clubs: "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClubChange = (value: string) => {
    setFormData((prev) => ({ ...prev, clubs: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate saving profile
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  // If not authenticated, this will redirect, but we'll return null just in case
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Your Profile</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} readOnly />
            </div>
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Major
              </label>
              <Input type="text" id="major" name="major" value={formData.major} onChange={handleChange} />
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
              />
            </div>
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <Textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Enter your interests, separated by commas"
              />
            </div>
            <div>
              <label htmlFor="clubs" className="block text-sm font-medium text-gray-700">
                Club Affiliations
              </label>
              <Select onValueChange={handleClubChange} value={formData.clubs}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your clubs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs_club">Computer Science Club</SelectItem>
                  <SelectItem value="debate_club">Debate Club</SelectItem>
                  <SelectItem value="chess_club">Chess Club</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

