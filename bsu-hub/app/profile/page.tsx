import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Profile() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input type="text" id="name" defaultValue="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input type="email" id="email" defaultValue="john.doe@bsu.edu" readOnly />
          </div>
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700">
              Major
            </label>
            <Input type="text" id="major" defaultValue="Computer Science" />
          </div>
          <div>
            <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700">
              Graduation Year
            </label>
            <Input type="number" id="graduation_year" defaultValue="2025" />
          </div>
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <Textarea id="interests" placeholder="Enter your interests, separated by commas" />
          </div>
          <div>
            <label htmlFor="clubs" className="block text-sm font-medium text-gray-700">
              Club Affiliations
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your clubs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs_club">Computer Science Club</SelectItem>
                <SelectItem value="debate_club">Debate Club</SelectItem>
                <SelectItem value="chess_club">Chess Club</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-black text-yellow-400 hover:bg-gray-800">Save Changes</Button>
        </form>
      </div>
    </div>
  )
}

