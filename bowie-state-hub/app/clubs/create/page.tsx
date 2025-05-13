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
import { ArrowLeft, Users, Clock, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { withAuth } from "@/lib/auth-context"

function CreateClub() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    meetingTime: "",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the data for the API
      const clubData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        meetingTime: formData.meetingTime,
        location: formData.location,
      }

      // Send the data to the API
      const response = await fetch("/api/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(clubData),
      })
      
      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Club Created",
          description: "Your club has been successfully created.",
        })
        // Redirect to the clubs page
        router.push("/clubs")
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create club. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating club:", error)
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
          <Link href="/clubs" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create New Club</h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Club Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter club name"
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
                placeholder="Describe your club's purpose and activities"
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4 inline mr-1" />
                Category
              </label>
              <Select onValueChange={handleCategoryChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="recreational">Recreational</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="advocacy">Advocacy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="h-4 w-4 inline mr-1" />
                Meeting Time
              </label>
              <Input
                type="text"
                id="meetingTime"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleChange}
                placeholder="e.g., Tuesdays at 5:00 PM"
              />
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
                placeholder="e.g., Student Center, Room 203"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.push("/clubs")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Club"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Wrap the component with the authentication HOC
export default withAuth(CreateClub)
