import mongoose from "mongoose"

const StudyGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    members: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    maxMembers: { type: Number, required: true },
    meetingDate: Date,
    meetingTime: String,
    location: String,
    messages: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        date: { type: Date, default: Date.now },
      },
    ],
    notifyMembers: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const StudyGroup = mongoose.models.StudyGroup || mongoose.model("StudyGroup", StudyGroupSchema)
