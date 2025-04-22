import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-pink-50 dark:bg-zinc-900 border-t border-pink-100 dark:border-pink-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-3xl mr-2">🍩</span>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-pink-500 to-amber-500 text-transparent bg-clip-text">
                DoughDelights
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
              Handcrafted gourmet donuts made with love. Our artisanal creations are made fresh daily with premium
              ingredients for an unforgettable taste experience.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-zinc-600 hover:text-pink-500 dark:text-zinc-400 dark:hover:text-pink-400"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-pink-500 dark:text-zinc-400 dark:hover:text-pink-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 hover:text-pink-500 dark:text-zinc-400 dark:hover:text-pink-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-zinc-600 hover:text-pink-500 dark:text-zinc-400 dark:hover:text-pink-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Subscribe to get special offers, free giveaways, and new flavor announcements.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="rounded-full bg-white dark:bg-zinc-800" />
              <Button className="rounded-full bg-pink-500 hover:bg-pink-600">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 dark:border-pink-900 mt-12 pt-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} DoughDelights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
