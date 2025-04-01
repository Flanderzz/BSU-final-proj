import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Using Our Services</h2>
            <p>
              Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
              dapibus. Mauris iaculis porttitor posuere.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Account Registration</h2>
            <p>
              Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
              tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.
            </p>
            <p>
              Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis
              porttitor congue.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. User Content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>
            <p>
              Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Prohibited Activities</h2>
            <p>
              Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
              dapibus. Mauris iaculis porttitor posuere.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Termination</h2>
            <p>
              Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
              tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Disclaimer</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: studenthub@bsu.edu
              <br />
              Phone: (301) 860-4000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

