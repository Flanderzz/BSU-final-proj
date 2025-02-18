import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Marketplace() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Student Marketplace</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Input type="text" placeholder="Search items..." className="w-64" />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="textbooks">Textbooks</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-black text-yellow-400 hover:bg-gray-800">Post Item</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <MarketplaceItemCard key={item} />
        ))}
      </div>
    </div>
  )
}

function MarketplaceItemCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Item Title</h3>
        <p className="text-gray-600 mb-4">Brief description of the item</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Price: $XX.XX</span>
          <Button variant="outline">Contact Seller</Button>
        </div>
      </div>
    </div>
  )
}

