import { connectDB } from "@/lib/mongoose"
import { Resource } from "@/models/Resource"
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const query: any = {}

  const search = searchParams.get("search")
  const subject = searchParams.get("subject")

  if (search) query.title = { $regex: search, $options: "i" }
  if (subject) query.subject = subject

  const resources = await Resource.find(query).sort({ createdAt: -1 })

  return NextResponse.json({ resources })
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

    const resource = await Resource.create({
      ...body,
      uploadedBy: user.id,
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (err) {
    console.error("POST /api/resources error:", err)
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}
