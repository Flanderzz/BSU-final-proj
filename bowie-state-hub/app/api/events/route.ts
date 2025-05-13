import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Event } from "@/models/Event"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const query: any = {}

  const search = searchParams.get("search")
  const category = searchParams.get("category")

  if (search) {
    query.title = { $regex: search, $options: "i" }
  }

  if (category && category !== "all") {
    query.category = category
  }

  const events = await Event.find(query).sort({ date: 1 })
  return NextResponse.json({ events })
}

export async function POST(req: NextRequest) {
  await connectDB()

  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  try {
    const user = verifyToken(token)

    const body = await req.json()

    if (!body.title || !body.date || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Optionally, attach the user ID to the event
    const event = await Event.create({
      ...body,
      organizer: user.id,
    })

    return NextResponse.json({ event }, { status: 201 })
  } catch (err) {
    console.error("Invalid token:", err)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
