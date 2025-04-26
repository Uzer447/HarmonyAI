import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { Nav } from '@/components/Nav'
import './globals.css'
import { cn } from '@/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Harmony - Your personal AI Therapist',
  description: 'A platform for personalized AI therapy and assistance.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            'flex flex-col min-h-screen antialiased'
          )}
        >
          <header className="flex w-full justify-between items-center gap-4 h-16 bg-gray-100">
            <Nav />
          </header>
          <main className="flex-1">
            {/* Show main app only when signed in */}
            <SignedIn>{children}</SignedIn>

            {/* Show login/signup buttons when signed out */}
            <SignedOut>
              <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
                <h1 className="text-2xl font-semibold">
                  Welcome to Harmony 🧘‍♀️
                </h1>
                <p className="text-gray-600">Sign in to access your AI therapist.</p>
                <div className="flex gap-4">
                  <SignInButton mode="modal">
                    <button className="rounded-lg px-4 py-2 bg-black text-white hover:bg-gray-900">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="rounded-lg px-4 py-2 bg-gray-200 text-black hover:bg-gray-300">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </SignedOut>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
