import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Club } from "@/models/Club"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const query: any = {}

  const search = searchParams.get("search")
  if (search) {
    query.name = { $regex: search, $options: "i" }
  }

  const clubs = await Club.find(query)
  return NextResponse.json({ clubs })
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

    if (!body.name || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const club = await Club.create({
      ...body,
      leaders: [user.id],
    })

    return NextResponse.json({ club }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
