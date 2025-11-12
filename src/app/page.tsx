import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, BarChart3, TrendingUp, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Rankwise 
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            KIHEAT Ranklist&apos;s AI Assistant
          </p>
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
            <Link href="/chat">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-8 py-3 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with Rankwise AI
              </Button>
            </Link>
            <a
              href="https://www.kiheat-ranklist.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 px-8 py-1 text-lg rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Rankings
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">Student Rankings</CardTitle>
              <CardDescription>
                Access comprehensive student rankings and academic performance data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Performance Analytics</CardTitle>
              <CardDescription>
                Detailed insights into academic performance, SGPA, and grade analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit">
                <MessageCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">AI Assistant</CardTitle>
              <CardDescription>
                Get instant help with rankings, results, and website navigation through our AI chatbot
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* About Section */}
        <Card className="border-0 shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">About KIHEAT Ranklist</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              KIHEAT Ranklist is your go-to platform for accessing student academic data, rankings, and performance analytics. 
              Our intelligent AI assistant, Rankwise, is here to help you navigate through rankings, understand results, 
              and get insights about student performance data effortlessly.
            </p>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
            <a
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="/chat"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Assistant
            </a>
            <a
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://www.kiheat-ranklist.me/"
            >
              <BarChart3 className="h-4 w-4" />
              Rankings
            </a>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-500">
            © 2025 KIHEAT Ranklist. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
