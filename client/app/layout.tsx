import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AutoFlow Admin Dashboard",
  description: "Admin dashboard for AutoFlow car trading platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <div className="flex h-screen bg-background">
              <AdminSidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-auto p-6">
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </main>
              </div>
            </div>
          </ReduxProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
