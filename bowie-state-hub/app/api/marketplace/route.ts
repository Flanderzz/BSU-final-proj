import { connectDB } from "@/lib/mongoose"
import { MarketplaceItem } from "@/models/MarketplaceItem"
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const query: any = {}

  const search = searchParams.get("search")
  const category = searchParams.get("category")

  if (search) query.title = { $regex: search, $options: "i" }
  if (category && category !== "all") query.category = category

  const items = await MarketplaceItem.find(query).populate("seller", "name email").sort({ createdAt: -1 })
  return NextResponse.json({ items })
}

export async function POST(req: NextRequest) {
  await connectDB()

  const authHeader = req.headers.get("authorization")
  const token = authHeader?.split(" ")[1]

  try {
    const user = token ? verifyToken(token) : null
    const body = await req.json()

    const item = await MarketplaceItem.create({
      ...body,
      seller: user?.id || null,
    })

    return NextResponse.json({ item }, { status: 201 })
  } catch (err) {
    console.error("POST /api/marketplace error:", err)
    return NextResponse.json({ error: "Failed to create marketplace item" }, { status: 500 })
  }
}
