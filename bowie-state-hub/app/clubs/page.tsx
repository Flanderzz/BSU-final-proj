"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Users, Clock, MapPin } from "lucide-react"

// Define the Club type
type Club = {
  id: number
  name: string
  description: string
  members: number
  category: string
  meetingTime: string
  location: string
}

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch clubs on component mount and when search changes
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true)
      try {
        // Build query parameters
        const params = new URLSearchParams()
        if (searchQuery) params.append("search", searchQuery)

        const response = await fetch(`/api/clubs?${params.toString()}`)
        const data = await response.json()

        if (response.ok) {
          setClubs(data.clubs)
        } else {
          console.error("Failed to fetch clubs:", data.error)
        }
      } catch (error) {
        console.error("Error fetching clubs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [searchQuery])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Student Clubs</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search clubs..."
          className="w-full md:w-64"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">
          <Link href="/clubs/create">Create Club</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : clubs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No clubs found</h3>
          <p className="text-gray-600">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  )
}

function ClubCard({ club }: { club: Club }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded bg-gray-100 text-gray-800">
          {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
        <p className="text-gray-600 mb-4">{club.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{club.members} members</span>
          </div>
          {club.meetingTime && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{club.meetingTime}</span>
            </div>
          )}
          {club.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{club.location}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline">Join Club</Button>
        </div>
      </div>
    </div>
  )
}
