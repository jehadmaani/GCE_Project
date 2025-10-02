"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <Card className="max-w-xl text-center shadow-lg p-6 transform transition duration-700 hover:scale-105 animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold mb-2">
            Welcome to Report Page
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 mb-6">
          Discover the reports, explore interactive features, and enjoy a smooth
          experience.
        </CardContent>
        <div className="flex justify-center gap-4">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Link href="/reports">Go to Reports</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
