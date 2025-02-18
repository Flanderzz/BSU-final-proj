import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-yellow-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            BSU Student Hub
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-white">
                  Clubs
                </Link>
              </li>
              <li>
                <Link href="/study-groups" className="hover:text-white">
                  Study Groups
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-white">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-yellow-400 text-black py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Bowie State Student Hub</h1>
            <p className="text-xl md:text-2xl mb-8">
              Your one-stop platform for campus events, clubs, and academic resources
            </p>
            <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard title="Event Discovery" description="Find and RSVP to campus events that interest you" />
              <FeatureCard
                title="Club Connections"
                description="Discover and join student organizations that match your passions"
              />
              <FeatureCard title="Study Groups" description="Join or create study groups for your courses" />
              <FeatureCard
                title="Resource Sharing"
                description="Access and share academic resources and study materials"
              />
              <FeatureCard title="Student Marketplace" description="Buy and sell used textbooks and materials" />
              <FeatureCard
                title="Real-time Notifications"
                description="Stay updated with event reminders and important announcements"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-yellow-400 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Bowie State Student Hub. All rights reserved.</p>
          <div className="mt-4">
            <Link href="#" className="hover:text-white mr-4">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white mr-4">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

