"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function StudyGroups() {
  const [searchQuery, setSearchQuery] = useState("")
  const [course, setCourse] = useState<string | null>(null)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle course selection
  const handleCourseChange = (value: string) => {
    setCourse(value)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Study Groups</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search study groups..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleCourseChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math101">Math 101</SelectItem>
              <SelectItem value="cs201">CS 201</SelectItem>
              <SelectItem value="bio301">BIO 301</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">Create Study Group</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((group) => (
          <StudyGroupCard key={group} />
        ))}
      </div>
    </div>
  )
}

function StudyGroupCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Study Group Name</h3>
        <p className="text-gray-600 mb-4">Course: CS 201 - Data Structures</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Members: 5/10</span>
          <Button variant="outline">Join Group</Button>
        </div>
      </div>
    </div>
  )
}

