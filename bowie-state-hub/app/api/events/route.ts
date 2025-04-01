import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from a database
const events = [
  {
    id: 1,
    title: "Welcome Week Orientation",
    description: "Join us for the kickoff of the new semester with activities, food, and more!",
    date: "2025-08-25T14:00:00Z",
    location: "Student Center",
    category: "social",
  },
  {
    id: 2,
    title: "Career Fair",
    description: "Meet with potential employers and explore internship and job opportunities.",
    date: "2025-09-15T10:00:00Z",
    location: "Gymnasium",
    category: "career",
  },
  {
    id: 3,
    title: "Computer Science Workshop",
    description: "Learn about the latest technologies in web development and AI.",
    date: "2025-09-20T15:30:00Z",
    location: "Computer Science Building, Room 203",
    category: "academic",
  },
  {
    id: 4,
    title: "Basketball Game: BSU vs. Morgan State",
    description: "Come support our team in this exciting rivalry game!",
    date: "2025-10-05T18:00:00Z",
    location: "A.C. Jordan Arena",
    category: "sports",
  },
  {
    id: 5,
    title: "Student Government Association Meeting",
    description: "Open meeting to discuss campus initiatives and student concerns.",
    date: "2025-09-10T16:00:00Z",
    location: "Student Center, Room 145",
    category: "academic",
  },
  {
    id: 6,
    title: "Homecoming Concert",
    description: "Annual homecoming concert featuring special guest performers.",
    date: "2025-10-25T20:00:00Z",
    location: "Bulldog Stadium",
    category: "social",
  },
]

export async function GET(request: Request) {
  // Get the URL to parse query parameters
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const category = searchParams.get("category")
  const search = searchParams.get("search")?.toLowerCase()

  // Filter events based on query parameters
  let filteredEvents = [...events]

  if (category) {
    filteredEvents = filteredEvents.filter((event) => event.category === category)
  }

  if (search) {
    filteredEvents = filteredEvents.filter(
      (event) => event.title.toLowerCase().includes(search) || event.description.toLowerCase().includes(search),
    )
  }

  // Return the filtered events
  return NextResponse.json({ events: filteredEvents })
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { title, description, date, location, category } = body

    // Validate the input
    if (!title || !description || !date || !location || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // In a real application, you would save to a database
    // For this example, we'll just return a success message

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        event: {
          id: events.length + 1,
          title,
          description,
          date,
          location,
          category,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

