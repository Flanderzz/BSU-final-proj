import mongoose from "mongoose"

const InquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  date: { type: Date, default: Date.now },
})

const MarketplaceItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["textbooks", "electronics", "furniture", "clothing", "other"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["New", "Like New", "Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    status: {
      type: String,
      enum: ["available", "pending", "sold"],
      default: "available",
    },
    inquiries: [InquirySchema],
  },
  { timestamps: true }
)

export const MarketplaceItem = mongoose.models.MarketplaceItem || mongoose.model("MarketplaceItem", MarketplaceItemSchema)
