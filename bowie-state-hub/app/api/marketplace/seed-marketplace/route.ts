import { connectDB } from "@/lib/mongoose"
import { MarketplaceItem } from "@/models/MarketplaceItem"
import { NextResponse } from "next/server"

export async function POST() {
  await connectDB()

  const items = [
    {
      title: "TI-84 Graphing Calculator",
      description: "Like new, only used for 1 semester.",
      price: 80,
      category: "electronics",
      condition: "Excellent",
    },
    {
      title: "Intro to Psychology Textbook",
      description: "Required for PSY101. Some notes in margin.",
      price: 30,
      category: "textbooks",
      condition: "Good",
    },
    {
      title: "Dorm Mini Fridge",
      description: "Compact fridge, works well. Some scratches.",
      price: 65,
      category: "furniture",
      condition: "Fair",
    },
    {
      title: "BSU Hoodie (Large)",
      description: "School spirit hoodie, worn twice.",
      price: 25,
      category: "clothing",
      condition: "Like New",
    },
    {
      title: "Standing Desk Converter",
      description: "Helps with posture during long study sessions.",
      price: 90,
      category: "other",
      condition: "Excellent",
    },
  ]

  await MarketplaceItem.deleteMany({})
  const inserted = await MarketplaceItem.insertMany(items)

  return NextResponse.json({ success: true, count: inserted.length })
}
