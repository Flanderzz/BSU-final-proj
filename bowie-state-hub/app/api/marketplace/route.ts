import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from a database
const items = [
  {
    id: 1,
    title: "Calculus Textbook - 8th Edition",
    description: "Like new condition. Barely used for MATH 225.",
    price: 45.0,
    category: "textbooks",
    condition: "Like New",
    seller: {
      id: 1,
      name: "John Doe",
      email: "john.doe@bsu.edu",
    },
    datePosted: "2025-08-15T10:30:00Z",
  },
  {
    id: 2,
    title: "TI-84 Plus Graphing Calculator",
    description: "Works perfectly. No longer needed after finishing my math courses.",
    price: 75.0,
    category: "electronics",
    condition: "Good",
    seller: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@bsu.edu",
    },
    datePosted: "2025-08-17T14:45:00Z",
  },
  {
    id: 3,
    title: "Introduction to Psychology Textbook",
    description: "For PSYC 101. Some highlighting but otherwise in good condition.",
    price: 30.0,
    category: "textbooks",
    condition: "Good",
    seller: {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@bsu.edu",
    },
    datePosted: "2025-08-18T09:15:00Z",
  },
  {
    id: 4,
    title: "Dorm Mini Fridge",
    description: "1.7 cubic feet. Perfect for dorm rooms. Used for one year.",
    price: 60.0,
    category: "furniture",
    condition: "Good",
    seller: {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@bsu.edu",
    },
    datePosted: "2025-08-20T16:30:00Z",
  },
  {
    id: 5,
    title: "Computer Science: An Overview - 13th Edition",
    description: "Required for CS 101. No markings or damage.",
    price: 50.0,
    category: "textbooks",
    condition: "Excellent",
    seller: {
      id: 5,
      name: "David Brown",
      email: "david.brown@bsu.edu",
    },
    datePosted: "2025-08-21T11:20:00Z",
  },
  {
    id: 6,
    title: "Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness settings.",
    price: 15.0,
    category: "furniture",
    condition: "Like New",
    seller: {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@bsu.edu",
    },
    datePosted: "2025-08-22T13:10:00Z",
  },
]

export async function GET(request: Request) {
  // Get the URL to parse query parameters
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const category = searchParams.get("category")
  const search = searchParams.get("search")?.toLowerCase()
  const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : null

  // Filter items based on query parameters
  let filteredItems = [...items]

  if (category) {
    filteredItems = filteredItems.filter((item) => item.category === category)
  }

  if (search) {
    filteredItems = filteredItems.filter(
      (item) => item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search),
    )
  }

  if (maxPrice !== null) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice)
  }

  // Return the filtered items
  return NextResponse.json({ items: filteredItems })
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { title, description, price, category, condition } = body

    // Validate the input
    if (!title || !description || !price || !category || !condition) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate price
    if (isNaN(Number.parseFloat(price)) || Number.parseFloat(price) <= 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Save to a database
    // 2. Associate with the authenticated user
    // 3. Handle image uploads

    // Mock seller data (in a real app, this would come from authentication)
    const seller = {
      id: 1,
      name: "John Doe",
      email: "john.doe@bsu.edu",
    }

    return NextResponse.json(
      {
        success: true,
        message: "Item posted successfully",
        item: {
          id: items.length + 1,
          title,
          description,
          price: Number.parseFloat(price),
          category,
          condition,
          seller,
          datePosted: new Date().toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error posting item:", error)
    return NextResponse.json({ error: "Failed to post item" }, { status: 500 })
  }
}

