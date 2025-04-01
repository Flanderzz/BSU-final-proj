import { NextResponse } from "next/server"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@bsu.edu",
    password: "password123",
    role: "student",
    major: "Computer Science",
    graduationYear: 2025,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@bsu.edu",
    password: "password456", 
    role: "club_leader",
    major: "Business Administration",
    graduationYear: 2024,
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const { password: _, ...userData } = user

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData,
      token: "mock-jwt-token",
    })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

