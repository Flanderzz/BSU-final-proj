"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

// Define the Event type
type Event = {
  id: number
  title: string
  description: string
  date: string
  location: string
  category: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  // Fetch events on component mount and when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        // Build query parameters
        const params = new URLSearchParams()
        if (searchQuery) params.append("search", searchQuery)
        if (category) params.append("category", category)

        const response = await fetch(`/api/events?${params.toString()}`)
        const data = await response.json()

        if (response.ok) {
          setEvents(data.events)
        } else {
          console.error("Failed to fetch events:", data.error)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [searchQuery, category])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Campus Events</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} formatDate={formatDate} formatTime={formatTime} />
          ))}
        </div>
      )}
    </div>
  )
}

function EventCard({
  event,
  formatDate,
  formatTime,
}: {
  event: Event
  formatDate: (date: string) => string
  formatTime: (date: string) => string
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded bg-gray-100 text-gray-800">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline">RSVP</Button>
        </div>
      </div>
    </div>
  )
}
