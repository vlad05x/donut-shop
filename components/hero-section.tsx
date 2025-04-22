"use client"

import { useRef, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the DonutCanvas with no SSR to avoid hydration issues
const DonutCanvas = dynamic(() => import("@/components/donut-canvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center">Loading 3D scene...</div>,
})

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-amber-50 dark:from-pink-950 dark:to-amber-950 opacity-50" />

      {/* Floating donuts background */}
      <div className="absolute inset-0 overflow-hidden">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading donuts...</div>}>
          <DonutCanvas />
        </Suspense>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y, opacity }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-pink-800 dark:text-pink-300"
          >
            Handcrafted Gourmet Donuts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-zinc-700 dark:text-zinc-300"
          >
            Indulge in our artisanal creations, made fresh daily with premium ingredients and a whole lot of love.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-pink-200 dark:border-pink-800">
              Build Your Own <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-50 to-transparent dark:from-zinc-900 dark:to-transparent" />
    </section>
  )
}
