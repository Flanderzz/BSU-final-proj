"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Resource = {
  _id: string
  title: string
  description: string
  subject: string
  course?: string
  resourceType: string
  fileUrl: string
  uploadedBy?: string
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subject, setSubject] = useState<string | null>(null)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle subject selection
  const handleSubjectChange = (value: string) => {
    setSubject(value)
  }

  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    const fetchResources = async () => {
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (subject) params.append("subject", subject)

      const response = await fetch(`/api/resources?${params.toString()}`)
      const data = await response.json()

      setResources(data.resources)
    }

    fetchResources()
  }, [searchQuery, subject])


  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Study Resources</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search resources..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleSubjectChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="bio">Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">
          <Link href="/resources/create">Upload Resource</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
      </div>
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-1">Subject: {resource.subject}</p>
        <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Uploaded by: {resource.uploadedBy || "Anonymous"}
          </span>
          <Button asChild variant="outline">
            <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

