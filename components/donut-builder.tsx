"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useShop } from "@/context/shop-context"
import { toast } from "@/components/ui/use-toast"

// Типы для топпингов
interface Glaze {
  id: string
  name: string
  color: string
}

interface Sprinkle {
  id: string
  name: string
  color: string
}

interface Topping {
  id: string
  name: string
  color: string
}

const toppings = {
  glazes: [
    { id: "chocolate", name: "Chocolate", color: "bg-amber-900" },
    { id: "vanilla", name: "Vanilla", color: "bg-amber-100" },
    { id: "strawberry", name: "Strawberry", color: "bg-pink-300" },
    { id: "maple", name: "Maple", color: "bg-amber-500" },
  ],
  sprinkles: [
    { id: "rainbow", name: "Rainbow", color: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500" },
    { id: "chocolate", name: "Chocolate", color: "bg-amber-800" },
    { id: "sugar", name: "Sugar", color: "bg-white dark:bg-zinc-200" },
  ],
  toppings: [
    { id: "nuts", name: "Nuts", color: "bg-amber-700" },
    { id: "coconut", name: "Coconut", color: "bg-white dark:bg-zinc-200" },
    { id: "oreo", name: "Oreo Crumbs", color: "bg-zinc-900" },
  ],
}

interface DonutProps {
  glaze: Glaze | null
  sprinkles: Sprinkle | null
  topping: Topping | null
}

function Donut({ glaze, sprinkles, topping }: DonutProps) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full bg-amber-300 dark:bg-amber-400 flex items-center justify-center">
        <div className="w-1/3 h-1/3 rounded-full bg-white dark:bg-zinc-900"></div>
      </div>
      {glaze && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute inset-0 rounded-full ${glaze.color} flex items-center justify-center`}
          style={{ clipPath: "circle(50% at center)" }}
        >
          <div className="w-1/3 h-1/3 rounded-full bg-white dark:bg-zinc-900"></div>
        </motion.div>
      )}
      {sprinkles && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-full flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-3 rounded-full ${sprinkles.color}`}
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
              />
            ))}
            <div className="w-1/3 h-1/3 rounded-full bg-white dark:bg-zinc-900"></div>
          </div>
        </motion.div>
      )}

      {topping && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-4 rounded-full ${topping.color}`}
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 rounded-full bg-white dark:bg-zinc-900"></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function DonutBuilder() {
  const [selectedGlaze, setSelectedGlaze] = useState<Glaze | null>(null)
  const [selectedSprinkles, setSelectedSprinkles] = useState<Sprinkle | null>(null)
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null)
  const { addToCart } = useShop()

  const handleItemClick = (type: "glaze" | "sprinkles" | "topping", item: Glaze | Sprinkle | Topping) => {
    if (type === "glaze") {
      setSelectedGlaze(item as Glaze)
    } else if (type === "sprinkles") {
      setSelectedSprinkles(item as Sprinkle)
    } else if (type === "topping") {
      setSelectedTopping(item as Topping)
    }
  }

  const handleAddCustomDonut = () => {
    const customDonut = {
      id: 100 + Math.floor(Math.random() * 900), 
      name: "Custom Donut",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      tags: ["custom"],
    }

    addToCart(customDonut)
    toast({
      title: "Added to cart",
      description: "Your custom donut has been added to your cart.",
    })
  }

  return (
    <div id="#donut-builder" className="grid md:grid-cols-2 gap-8 items-center">
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-pink-100 dark:border-pink-900">
        <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-pink-50 to-amber-50 dark:from-pink-900/30 dark:to-amber-900/30 flex items-center justify-center">
          <Donut glaze={selectedGlaze} sprinkles={selectedSprinkles} topping={selectedTopping} />
        </div>
        <div className="mt-6 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">Click on toppings to add them to your donut!</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedGlaze(null)} disabled={!selectedGlaze}>
              Reset Glaze
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedSprinkles(null)}
              disabled={!selectedSprinkles}
            >
              Reset Sprinkles
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedTopping(null)} disabled={!selectedTopping}>
              Reset Topping
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Tabs defaultValue="glazes" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="glazes">Glazes</TabsTrigger>
            <TabsTrigger value="sprinkles">Sprinkles</TabsTrigger>
            <TabsTrigger value="toppings">Toppings</TabsTrigger>
          </TabsList>

          <TabsContent value="glazes" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {toppings.glazes.map((glaze) => (
                <Card
                  key={glaze.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleItemClick("glaze", glaze)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${glaze.color}`}></div>
                    <span>{glaze.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sprinkles" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {toppings.sprinkles.map((sprinkle) => (
                <Card
                  key={sprinkle.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleItemClick("sprinkles", sprinkle)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${sprinkle.color}`}></div>
                    <span>{sprinkle.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="toppings" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {toppings.toppings.map((topping) => (
                <Card
                  key={topping.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleItemClick("topping", topping)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${topping.color}`}></div>
                    <span>{topping.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button size="lg" className="w-full bg-pink-500 hover:bg-pink-600" onClick={handleAddCustomDonut}>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add Custom Donut to Cart - $6.99
          </Button>
        </div>
      </div>
    </div>
  )
}
