import { connectDB } from "@/lib/mongoose"
import { Club } from "@/models/Club"
import { NextResponse } from "next/server"

export async function POST() {
  await connectDB()

  const clubs = [
    {
      name: "Computer Science Club",
      description: "A club for students interested in computer science and programming.",
      category: "academic",
      meetingTime: "Tuesdays at 5:00 PM",
      location: "Computer Science Building, Room 105",
    },
    {
      name: "Black Student Union",
      description: "Organization dedicated to addressing the needs and concerns of Black students on campus.",
      category: "cultural",
      meetingTime: "Wednesdays at 6:30 PM",
      location: "Student Center, Room 203",
    },
    {
      name: "Debate Team",
      description: "Competitive debate team that participates in regional and national tournaments.",
      category: "academic",
      meetingTime: "Mondays and Thursdays at 4:00 PM",
      location: "Humanities Building, Room 156",
    },
    {
      name: "Chess Club",
      description: "For chess enthusiasts of all skill levels. Weekly games and tournaments.",
      category: "recreational",
      meetingTime: "Fridays at 3:00 PM",
      location: "Student Center, Game Room",
    },
    {
      name: "Business Leaders Association",
      description: "Networking and professional development for business students.",
      category: "professional",
      meetingTime: "Every other Tuesday at 5:30 PM",
      location: "Business Building, Room 210",
    },
    {
      name: "Environmental Action Coalition",
      description: "Student organization focused on sustainability and environmental advocacy.",
      category: "advocacy",
      meetingTime: "Wednesdays at 5:00 PM",
      location: "Science Building, Room 134",
    },
  ]

  await Club.deleteMany({})
  await Club.insertMany(clubs)

  return NextResponse.json({ success: true, message: "Clubs seeded" })
}
