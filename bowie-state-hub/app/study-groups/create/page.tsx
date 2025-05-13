"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Users, Calendar, Clock, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { withAuth } from "@/lib/auth-context"

function CreateStudyGroup() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    description: "",
    maxMembers: "10",
    meetingDate: "",
    meetingTime: "",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCourseChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to an API endpoint
      // For now, we'll just simulate a successful creation

      setTimeout(() => {
        toast({
          title: "Study Group Created",
          description: "Your study group has been successfully created.",
        })
        // Redirect to the study groups page
        router.push("/study-groups")
      }, 1000)
    } catch (error) {
      console.error("Error creating study group:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/study-groups" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create Study Group</h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter study group name"
                required
              />
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <Select onValueChange={handleCourseChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math101">Math 101</SelectItem>
                  <SelectItem value="cs201">CS 201</SelectItem>
                  <SelectItem value="bio301">BIO 301</SelectItem>
                  <SelectItem value="eng105">ENG 105</SelectItem>
                  <SelectItem value="chem202">CHEM 202</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what your study group will focus on"
                rows={3}
                required
              />
            </div>

            <div>
              <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4 inline mr-1" />
                Maximum Members
              </label>
              <Input
                type="number"
                id="maxMembers"
                name="maxMembers"
                value={formData.maxMembers}
                onChange={handleChange}
                min="2"
                max="50"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Meeting Date
                </label>
                <Input
                  type="date"
                  id="meetingDate"
                  name="meetingDate"
                  value={formData.meetingDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Meeting Time
                </label>
                <Input
                  type="time"
                  id="meetingTime"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                Meeting Location
              </label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Library, 2nd Floor"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.push("/study-groups")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Study Group"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Wrap the component with the authentication HOC
export default withAuth(CreateStudyGroup)
