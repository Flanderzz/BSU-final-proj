import mongoose from "mongoose"

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["academic", "cultural", "recreational", "professional", "advocacy"],
      required: true,
    },
    meetingTime: String,
    location: String,
    members: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    leaders: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  },
  { timestamps: true }
)

export const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema)
