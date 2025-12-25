'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Lock, Users, Zap, Heart, Shield } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
            <MessageCircle className="w-4 h-4 text-black mr-2" />
            <span className="text-sm font-medium text-gray-700">Welcome to Anonymous Messaging</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 leading-tight">
            Share Your Thoughts
            <span className="block text-gray-800">
              Completely Anonymous
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Send and receive anonymous messages from anyone. Express yourself freely without revealing your identity. Perfect for feedback, confessions, or just saying what's on your mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={session ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white border-0 w-full sm:w-auto cursor-pointer">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <MessageCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Anonymous Message Received</p>
                    <p className="text-black text-sm mt-1">Your insight inspired me today 💜</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <MessageCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">Anonymous Message Received</p>
                    <p className="text-black text-sm mt-1">Keep up the amazing work! 🚀</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with privacy and user experience at the core
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Complete Anonymity</h3>
              <p className="text-gray-600">
                Send messages without revealing your identity. Your privacy is our priority.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Share Your Link</h3>
              <p className="text-gray-600">
                Get a unique link to share with friends. They can send you anonymous messages instantly.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Instant Delivery</h3>
              <p className="text-gray-600">
                Messages are delivered instantly. See reactions and feedback in real-time.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Secure & Safe</h3>
              <p className="text-gray-600">
                All messages are encrypted and stored securely. No spam or abuse tolerated.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Manage Messages</h3>
              <p className="text-gray-600">
                Accept, reject, or delete messages. You're always in control of what you receive.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Easy Dashboard</h3>
              <p className="text-gray-600">
                Organize messages, view analytics, and manage your profile all in one place.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-gray-600">
              Three simple steps to start receiving anonymous messages
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-black">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-black mb-2">Create Your Account</h3>
                <p className="text-gray-600">
                  Sign up with your email in seconds. Your profile is private and secure.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-black">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-black mb-2">Share Your Link</h3>
                <p className="text-gray-600">
                  Get a unique URL to share with friends, colleagues, or on social media. Anyone can send you messages.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-black">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-black mb-2">Receive & Respond</h3>
                <p className="text-gray-600">
                  Get instant notifications when someone sends you a message. Accept, reject, or respond anonymously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Anonymously?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are having honest conversations without fear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={session ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="bg-white hover:bg-gray-100 text-black border-0 w-full sm:w-auto cursor-pointer">
                Create Account Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-black font-bold mb-4">Mystery Message</h3>
              <p className="text-gray-600 text-sm">
                The anonymous messaging platform for honest conversations.
              </p>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><Link href={session ? "/dashboard" : "/sign-up"} className="hover:text-black transition">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-black transition">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-black transition">Twitter</a></li>
                <li><a href="#" className="hover:text-black transition">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 Mystery Message. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
