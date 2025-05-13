import mongoose from "mongoose";

export enum UserRole {
  STUDENT = "student",
  CLUB_LEADER = "club_leader",
  FACULTY = "faculty",
  ADMIN = "admin",
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    major: String,
    graduationYear: Number,
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
