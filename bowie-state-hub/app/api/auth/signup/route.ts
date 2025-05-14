import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const EMAIL_REGEX = /^[^\s@]+@bsu\.edu$/;


export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role, major, graduationYear } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    if (EMAIL_REGEX.test(email) === false) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      major,
      graduationYear,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" })

    if (!token) {
      return NextResponse.json({ success: false, error: "Token generation failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, token: token, user: { id: user._id, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
