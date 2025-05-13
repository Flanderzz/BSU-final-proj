"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type StudyGroup = {
  _id: string
  name: string
  course: string
  description: string
  maxMembers: number
  members: string[] // or User[] later
}

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

  const [groups, setGroups] = useState<StudyGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchGroups = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (course) params.append("course", course)

      const res = await fetch(`/api/study-groups?${params.toString()}`)
      const data = await res.json()
      setGroups(data.groups)
    } catch (err) {
      console.error("Error fetching groups:", err)
    } finally {
      setLoading(false)
    }
  }

  fetchGroups()
}, [searchQuery, course])


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
        <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">
          <Link href="/study-groups/create">Create Study Group</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <StudyGroupCard key={group._id} group={group} />
      ))}
      </div>
    </div>
  )
}

function StudyGroupCard({ group }: { group: StudyGroup }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
        <p className="text-gray-600 mb-4">Course: {group.course}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Members: {group.members.length}/{group.maxMembers}
          </span>
          <Button variant="outline">Join Group</Button>
        </div>
      </div>
    </div>
  )
}

