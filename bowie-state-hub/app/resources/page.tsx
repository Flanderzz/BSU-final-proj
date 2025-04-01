"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
        <Button className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">Upload Resource</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((resource) => (
          <ResourceCard key={resource} />
        ))}
      </div>
    </div>
  )
}

function ResourceCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Resource Title</h3>
        <p className="text-gray-600 mb-4">Subject: Computer Science</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Uploaded by: John Doe</span>
          <Button variant="outline">Download</Button>
        </div>
      </div>
    </div>
  )
}

