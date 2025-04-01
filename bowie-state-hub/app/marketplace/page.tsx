"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Tag, Calendar, User } from "lucide-react"

// Define the Item type
type Item = {
  id: number
  title: string
  description: string
  price: number
  category: string
  condition: string
  seller: {
    id: number
    name: string
    email: string
  }
  datePosted: string
}

export default function Marketplace() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  // Fetch items on component mount and when filters change
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        // Build query parameters
        const params = new URLSearchParams()
        if (searchQuery) params.append("search", searchQuery)
        if (category) params.append("category", category)

        const response = await fetch(`/api/marketplace?${params.toString()}`)
        const data = await response.json()

        if (response.ok) {
          setItems(data.items)
        } else {
          console.error("Failed to fetch items:", data.error)
        }
      } catch (error) {
        console.error("Error fetching items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [searchQuery, category])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Student Marketplace</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search items..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="textbooks">Textbooks</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-black text-yellow-400 hover:bg-gray-800 w-full md:w-auto">Post Item</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MarketplaceItemCard key={item.id} item={item} formatDate={formatDate} />
          ))}
        </div>
      )}
    </div>
  )
}

function MarketplaceItemCard({
  item,
  formatDate,
}: {
  item: Item
  formatDate: (date: string) => string
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded bg-gray-100 text-gray-800">
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Tag className="h-4 w-4 mr-2" />
            <span>
              ${item.price.toFixed(2)} • {item.condition}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            <span>Seller: {item.seller.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Posted: {formatDate(item.datePosted)}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline">Contact Seller</Button>
        </div>
      </div>
    </div>
  )
}

