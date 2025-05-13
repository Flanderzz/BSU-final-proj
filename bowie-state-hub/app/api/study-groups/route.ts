import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { StudyGroup } from "@/models/StudyGroup"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const query: any = {}

  const search = searchParams.get("search")
  const course = searchParams.get("course")

  if (search) query.name = { $regex: search, $options: "i" }
  if (course) query.course = course

  const groups = await StudyGroup.find(query).sort({ createdAt: -1 })
  return NextResponse.json({ groups })
}

export async function POST(req: NextRequest) {
  await connectDB()

  const authHeader = req.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const token = authHeader.split(" ")[1]
    const user = verifyToken(token)

    const body = await req.json()

    const group = await StudyGroup.create({
      ...body,
      creator: user.id,
      members: [user.id],
    })

    return NextResponse.json({ group }, { status: 201 })
  } catch (err) {
    console.error("POST /api/study-groups error:", err)
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 500 })
  }
}
