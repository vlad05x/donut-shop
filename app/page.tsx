import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import ProductGrid from "@/components/product-grid"
import DonutBuilder from "@/components/donut-builder"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-cream-50 dark:from-zinc-900 dark:to-zinc-800">
      <Navbar />
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-8 text-pink-800 dark:text-pink-300">
          Our Delicious Creations
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-12">
          Handcrafted with love, our gourmet donuts are made fresh daily using only the finest ingredients. Discover
          your new favorite treat!
        </p>
        <ProductGrid />
      </section>
      <section className="container mx-auto px-4 py-16 mb-16">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-8 text-pink-800 dark:text-pink-300">
          Create Your Dream Donut
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-12">
          Let your imagination run wild! Mix and match toppings, fillings, and glazes to create your perfect donut
          masterpiece.
        </p>
        <DonutBuilder />
      </section>
      <Footer />
      <Toaster />
    </main>
  )
}
