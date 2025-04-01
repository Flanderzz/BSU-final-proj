import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from a database
const clubs = [
  {
    id: 1,
    name: "Computer Science Club",
    description: "A club for students interested in computer science and programming.",
    members: 45,
    category: "academic",
    meetingTime: "Tuesdays at 5:00 PM",
    location: "Computer Science Building, Room 105",
  },
  {
    id: 2,
    name: "Black Student Union",
    description: "Organization dedicated to addressing the needs and concerns of Black students on campus.",
    members: 78,
    category: "cultural",
    meetingTime: "Wednesdays at 6:30 PM",
    location: "Student Center, Room 203",
  },
  {
    id: 3,
    name: "Debate Team",
    description: "Competitive debate team that participates in regional and national tournaments.",
    members: 22,
    category: "academic",
    meetingTime: "Mondays and Thursdays at 4:00 PM",
    location: "Humanities Building, Room 156",
  },
  {
    id: 4,
    name: "Chess Club",
    description: "For chess enthusiasts of all skill levels. Weekly games and tournaments.",
    members: 15,
    category: "recreational",
    meetingTime: "Fridays at 3:00 PM",
    location: "Student Center, Game Room",
  },
  {
    id: 5,
    name: "Business Leaders Association",
    description: "Networking and professional development for business students.",
    members: 52,
    category: "professional",
    meetingTime: "Every other Tuesday at 5:30 PM",
    location: "Business Building, Room 210",
  },
  {
    id: 6,
    name: "Environmental Action Coalition",
    description: "Student organization focused on sustainability and environmental advocacy.",
    members: 31,
    category: "advocacy",
    meetingTime: "Wednesdays at 5:00 PM",
    location: "Science Building, Room 134",
  },
]

export async function GET(request: Request) {
  // Get the URL to parse query parameters
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const category = searchParams.get("category")
  const search = searchParams.get("search")?.toLowerCase()

  // Filter clubs based on query parameters
  let filteredClubs = [...clubs]

  if (category) {
    filteredClubs = filteredClubs.filter((club) => club.category === category)
  }

  if (search) {
    filteredClubs = filteredClubs.filter(
      (club) => club.name.toLowerCase().includes(search) || club.description.toLowerCase().includes(search),
    )
  }

  // Return the filtered clubs
  return NextResponse.json({ clubs: filteredClubs })
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, description, category, meetingTime, location } = body

    // Validate the input
    if (!name || !description || !category) {
      return NextResponse.json({ error: "Name, description, and category are required" }, { status: 400 })
    }

    // In a real application, you would save to a database
    // For this example, we'll just return a success message

    return NextResponse.json(
      {
        success: true,
        message: "Club created successfully",
        club: {
          id: clubs.length + 1,
          name,
          description,
          members: 1, // Starting with the creator
          category,
          meetingTime,
          location,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating club:", error)
    return NextResponse.json({ error: "Failed to create club" }, { status: 500 })
  }
}

