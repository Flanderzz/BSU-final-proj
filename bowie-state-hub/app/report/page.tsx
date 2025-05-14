"use client"

import React from "react"

export default function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Bowie State Student Hub Report</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
        <p>
          The Bowie State Student Hub is a centralized, user-friendly platform designed to address common
          challenges students face at Bowie State University — such as difficulty discovering campus events,
          coordinating study groups, and accessing academic resources. The platform enhances student engagement
          by offering tools to:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Discover and register for campus events</li>
          <li>Create and join study groups</li>
          <li>Upload and download academic resources</li>
          <li>Communicate in a structured environment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Project Progress</h2>
        <p>
          Initially, we identified that student engagement tools were fragmented and study groups lacked
          coordination. Our frontend MVP included login/sign-up, event listings, study group management,
          contact/marketing pages. Midway through development, the frontend was completely rebuilt for performance,
          UI consistency, and responsiveness.
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Login/Signup pages for secure access</li>
          <li>Events & Study Groups with filters and creation features</li>
          <li>Contact form with email delivery</li>
          <li>Rebuilt UI for consistency and mobile responsiveness</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Backend & Database</h2>
        <p>
          The backend features RESTful APIs with secure authentication and dynamic routing using Next.js API routes.
          A MongoDB database (via Mongoose) stores all user, event, club, and message data securely.
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>JWT-based user authentication</li>
          <li>MongoDB via Mongoose for schema-based models</li>
          <li>Nodemailer integration for contact messaging</li>
          <li>Role-based access and token validation</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Key Takeaways</h2>
        <p>
          This project strengthened our skills in full-stack web development, teamwork, debugging, and UI/UX design.
          It offered real-world experience solving problems that affect students directly, and required integration
          across frontend, backend, and database layers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
        <p>
          The Bowie State Student Hub is more than a class assignment — it's a scalable platform built to enhance
          campus life through better connectivity and academic collaboration. Future work includes user testing,
          accessibility improvements, and departmental partnerships to expand functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tools Used</h2>
        <p className="mt-2">
          <strong>Backend:</strong> Node.js, Next.js, Nodemailer, Mongoose, Zod, JSON Web Token (jsonwebtoken), bcryptjs
        </p>
        <p className="mt-2">
          <strong>Frontend:</strong> React, React DOM, Next.js, React Hook Form, @hookform/resolvers, React Day Picker,
          Lucide React, @radix-ui/* (all), Tailwind CSS, tailwindcss-animate, next-themes, clsx, cmdk, vaul, sonner,
          date-fns, embla-carousel-react, input-otp, recharts, react-resizable-panels, class-variance-authority, tailwind-merge
        </p>
        <p className="mt-2">
          <strong>Security:</strong> JSON Web Token (jsonwebtoken), @types/jsonwebtoken, bcryptjs, Zod
        </p>
        <p className="mt-2">
          <strong>Database:</strong> MongoDB, Mongoose, localStorage, IndexedDB
        </p>
      </section>
    </div>
  )
}
