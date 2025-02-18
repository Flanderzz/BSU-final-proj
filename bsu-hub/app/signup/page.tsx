import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignUp() {
  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up for BSU Student Hub</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input type="text" id="name" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input type="email" id="email" placeholder="your.email@bsu.edu" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input type="password" id="password" placeholder="••••••••" required />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="club_leader">Club Leader</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700">
              Major
            </label>
            <Input type="text" id="major" placeholder="Computer Science" />
          </div>
          <div>
            <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700">
              Graduation Year
            </label>
            <Input type="number" id="graduation_year" placeholder="2025" />
          </div>
          <Button className="w-full bg-black text-yellow-400 hover:bg-gray-800">Sign Up</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Sign up with BSU Portal
          </Button>
        </div>
      </div>
    </div>
  )
}

