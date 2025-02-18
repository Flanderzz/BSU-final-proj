import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login to BSU Student Hub</h1>
        <form className="space-y-4">
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
          <Button className="w-full bg-black text-yellow-400 hover:bg-gray-800">Sign In</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-black hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Sign in with BSU Portal
          </Button>
        </div>
      </div>
    </div>
  )
}

