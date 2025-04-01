import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
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

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
            <p>
              Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
              dapibus. Mauris iaculis porttitor posuere.
            </p>
            <p>
              Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim
              congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
            <p>
              Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
              tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.
            </p>
            <p>
              Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis
              porttitor congue.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Information Sharing</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>
            <p>
              Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Data Security</h2>
            <p>
              Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
              dapibus. Mauris iaculis porttitor posuere.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Your Rights</h2>
            <p>
              Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
              tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Cookies and Tracking</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to This Policy</h2>
            <p>
              Suspendisse potenti. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
              dapibus. Mauris iaculis porttitor posuere.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">9. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

