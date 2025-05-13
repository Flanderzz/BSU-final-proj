import { connectDB } from "@/lib/mongoose"
import { StudyGroup } from "@/models/StudyGroup"
import { NextResponse } from "next/server"

export async function POST() {
  await connectDB()

  const studyGroups = [
    {
      name: "Math 101 Study Group",
      course: "MATH101",
      description: "Collaborative problem-solving for weekly quizzes and exams.",
      maxMembers: 8,
      meetingDate: new Date("2025-05-20T17:00:00Z"),
      meetingTime: "5:00 PM",
      location: "Library Room 204",
    },
    {
      name: "Biology Notes Exchange",
      course: "BIO110",
      description: "Review sessions and flashcard games.",
      maxMembers: 10,
      meetingDate: new Date("2025-05-21T18:30:00Z"),
      meetingTime: "6:30 PM",
      location: "Science Building, Room 112",
    },
    {
      name: "Java Programming Workshop",
      course: "CS220",
      description: "Practice object-oriented Java with real problems.",
      maxMembers: 12,
      meetingDate: new Date("2025-05-23T16:00:00Z"),
      meetingTime: "4:00 PM",
      location: "Computer Lab 1",
    },
    {
      name: "Chemistry Crash Course",
      course: "CHEM130",
      description: "Review difficult reactions and lab reports.",
      maxMembers: 6,
      meetingDate: new Date("2025-05-24T14:00:00Z"),
      meetingTime: "2:00 PM",
      location: "Chemistry Hall, Room 103",
    },
  ]

  await StudyGroup.deleteMany({})
  const inserted = await StudyGroup.insertMany(studyGroups)

  return NextResponse.json({
    success: true,
    message: `Seeded ${inserted.length} study groups.`,
  })
}
