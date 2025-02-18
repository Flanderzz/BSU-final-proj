import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Resources() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Study Resources</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-4 md:mb-0">
          <Input type="text" placeholder="Search resources..." className="w-full md:w-64" />
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="bio">Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full md:w-auto bg-black text-yellow-400 hover:bg-gray-800 transition-colors duration-200">
          Upload Resource
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((resource) => (
          <div
            key={resource}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Resource Title</h3>
              <p className="text-gray-600 mb-4">Subject: Computer Science</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Uploaded by: John Doe</span>
                <Button
                  variant="outline"
                  className="hover:bg-yellow-400 hover:text-black transition-colors duration-200"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

