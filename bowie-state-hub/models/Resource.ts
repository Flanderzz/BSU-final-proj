import mongoose from "mongoose"

const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    course: String,
    resourceType: {
      type: String,
      enum: ["notes", "slides", "practice", "study_guide", "textbook", "article", "other"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Resource = mongoose.models.Resource || mongoose.model("Resource", ResourceSchema)
