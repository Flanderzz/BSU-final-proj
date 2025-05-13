import { connectDB } from "@/lib/mongoose"
import { Resource } from "@/models/Resource"
import { NextResponse } from "next/server"

export async function POST() {
  await connectDB()

  const resources = [
    {
      title: "Intro to Biology Notes",
      description: "Chapter summaries and diagrams from BIO110.",
      subject: "Biology",
      course: "BIO110",
      resourceType: "notes",
      fileUrl: "https://example.com/resources/bio-notes.pdf",
    },
    {
      title: "Calculus Practice Problems",
      description: "Limits, derivatives, and integrals from MATH101.",
      subject: "Math",
      course: "MATH101",
      resourceType: "practice",
      fileUrl: "https://example.com/resources/calculus-practice.pdf",
    },
    {
      title: "Java Programming Slides",
      description: "OOP concepts from CS220 course slides.",
      subject: "Computer Science",
      course: "CS220",
      resourceType: "slides",
      fileUrl: "https://example.com/resources/java-slides.pdf",
    },
    {
      title: "Environmental Science Study Guide",
      description: "Midterm study guide with key terms and review questions.",
      subject: "Environmental Science",
      resourceType: "study_guide",
      fileUrl: "https://example.com/resources/enviro-studyguide.pdf",
    },
    {
      title: "Psychology Article Summary",
      description: "Peer-reviewed article summary from PSY101.",
      subject: "Psychology",
      course: "PSY101",
      resourceType: "article",
      fileUrl: "https://example.com/resources/psych-article.pdf",
    },
  ]

  await Resource.deleteMany({})
  const inserted = await Resource.insertMany(resources)

  return NextResponse.json({
    success: true,
    message: `Seeded ${inserted.length} resources.`,
  })
}
