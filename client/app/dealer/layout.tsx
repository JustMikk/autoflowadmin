"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { DealerSidebar } from "@/components/layout/dealer-sidebar"
import { DealerHeader } from "@/components/layout/dealer-header"
import { useAppSelector } from "@/lib/store"

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user } = useAppSelector((state) => state.dealerAuth)

  // Skip auth check for auth pages
  const isAuthPage = pathname?.startsWith("/dealer/auth")

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      router.push("/dealer/auth/login")
    } else if (!isAuthPage && user && !user.onboardingCompleted) {
      router.push("/dealer/onboarding")
    }
  }, [isAuthenticated, user, router, isAuthPage])

  // Show auth pages without layout
  if (isAuthPage) {
    return <>{children}</>
  }

  // Show loading or redirect for unauthenticated users
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DealerSidebar />
      <div className="lg:pl-64">
        <DealerHeader />
        <main className="py-6 px-4 lg:px-6">{children}</main>
      </div>
    </div>
  )
}
