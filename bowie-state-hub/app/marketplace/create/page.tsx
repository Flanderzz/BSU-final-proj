"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Tag, DollarSign } from "lucide-react"
import { Header } from "@/components/header"
import { withAuth } from "@/lib/auth-context"

function CreateMarketplaceItem() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleConditionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, condition: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate price is a number
      const price = Number.parseFloat(formData.price)
      if (isNaN(price) || price <= 0) {
        toast({
          title: "Invalid Price",
          description: "Please enter a valid price greater than 0.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Prepare the data for the API
      const itemData = {
        title: formData.title,
        description: formData.description,
        price: price,
        category: formData.category,
        condition: formData.condition,
      }

      // Send the data to the API
      const response = await fetch("/api/marketplace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Item Posted",
          description: "Your item has been successfully posted to the marketplace.",
        })
        // Redirect to the marketplace page
        router.push("/marketplace")
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to post item. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error posting item:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/marketplace" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Post Item for Sale</h1>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Item Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter item title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item, including details about its condition and features"
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Price
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price in USD"
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                <Tag className="h-4 w-4 inline mr-1" />
                Category
              </label>
              <Select onValueChange={handleCategoryChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="textbooks">Textbooks</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <Select onValueChange={handleConditionChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Like New">Like New</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.push("/marketplace")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-black text-yellow-400 hover:bg-gray-800" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Item"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Wrap the component with the authentication HOC
export default withAuth(CreateMarketplaceItem)
