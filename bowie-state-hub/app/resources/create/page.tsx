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
import { ArrowLeft, FileText, BookOpen } from "lucide-react"
import { Header } from "@/components/header"
import { withAuth } from "@/lib/auth-context"

function CreateResource() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    course: "",
    resourceType: "",
    fileUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleResourceTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, resourceType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const token = localStorage.getItem("auth_token")
  
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
  
      if (response.ok) {
        toast({
          title: "Resource Created",
          description: "Your study resource has been successfully uploaded.",
        })
        router.push("/resources")
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating resource:", error)
      toast({
        title: "Error",
        description: "Unexpected error occurred.",
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
          <Link href="/resources" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Upload Study Resource</h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Resource Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter resource title"
                required
              />
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
                placeholder="Describe what this resource covers"
                rows={3}
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                <BookOpen className="h-4 w-4 inline mr-1" />
                Subject
              </label>
              <Select onValueChange={handleSubjectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="bio">Biology</SelectItem>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="chem">Chemistry</SelectItem>
                  <SelectItem value="phys">Physics</SelectItem>
                  <SelectItem value="hist">History</SelectItem>
                  <SelectItem value="psych">Psychology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course (Optional)
              </label>
              <Input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g., MATH 101, CS 201"
              />
            </div>

            <div>
              <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-1">
                <FileText className="h-4 w-4 inline mr-1" />
                Resource Type
              </label>
              <Select onValueChange={handleResourceTypeChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notes">Lecture Notes</SelectItem>
                  <SelectItem value="slides">Presentation Slides</SelectItem>
                  <SelectItem value="practice">Practice Problems</SelectItem>
                  <SelectItem value="study_guide">Study Guide</SelectItem>
                  <SelectItem value="textbook">Textbook</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">
                File URL or Link
              </label>
              <Input
                type="text"
                id="fileUrl"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                placeholder="Enter URL to your resource"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                In a real application, you would be able to upload files directly.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.push("/resources")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload Resource"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Wrap the component with the authentication HOC
export default withAuth(CreateResource)
