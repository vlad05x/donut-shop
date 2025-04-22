import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { ShopProvider } from "@/context/shop-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Custom display font for headings
const display = localFont({
  src: "../public/fonts/Montserrat-Regular.ttf",
  variable: "--font-display",
})

export const metadata = {
  title: "DoughDelights - Gourmet Donut Shop",
  description: "Handcrafted gourmet donuts made with premium ingredients and love",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ShopProvider>{children}</ShopProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
