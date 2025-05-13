import mongoose from "mongoose"

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    category: {
      type: String,
      enum: ["academic", "social", "career", "sports"],
      required: true,
    },
  },
  { timestamps: true }
)

export const Event = mongoose.models.Event || mongoose.model("Event", EventSchema)
