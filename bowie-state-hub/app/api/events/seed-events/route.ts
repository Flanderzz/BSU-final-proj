import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Event } from "@/models/Event"

export async function POST(req: Request) {
  try {
    await connectDB()

    const events = [
      {
        title: "Career Fair 2025",
        description: "Meet top employers hiring for internships and full-time roles.",
        date: new Date("2025-09-15T10:00:00"),
        location: "Student Center Ballroom",
        category: "career",
        organizer: null,
        attendees: [],
        notificationsEnabled: true,
      },
      {
        title: "Hackathon BSU",
        description: "A 24-hour hackathon for students to build, collaborate, and compete.",
        date: new Date("2025-10-03T17:00:00"),
        location: "Computer Science Building",
        category: "academic",
        organizer: null,
        attendees: [],
        notificationsEnabled: true,
      },
      {
        title: "Homecoming Concert",
        description: "Live music, food trucks, and school pride for BSU Homecoming.",
        date: new Date("2025-10-22T19:00:00"),
        location: "BSU Stadium",
        category: "social",
        organizer: null,
        attendees: [],
        notificationsEnabled: false,
      },
      {
        title: "Intramural Soccer Championship",
        description: "Watch the top teams in the student soccer finals.",
        date: new Date("2025-11-08T14:00:00"),
        location: "Recreation Field",
        category: "sports",
        organizer: null,
        attendees: [],
        notificationsEnabled: true,
      },
      {
        title: "Grad School Info Session",
        description: "Learn about grad school applications and opportunities.",
        date: new Date("2025-09-20T13:00:00"),
        location: "Library Auditorium",
        category: "academic",
        organizer: null,
        attendees: [],
        notificationsEnabled: true,
      },
    ]

    await Event.deleteMany({})
    await Event.insertMany(events)

    return NextResponse.json({ success: true, message: "Events seeded successfully." })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ success: false, error: "Failed to seed events." }, { status: 500 })
  }
}
