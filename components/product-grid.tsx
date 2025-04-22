"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingBag, Heart } from "lucide-react"
import { useShop, type Product } from "@/context/shop-context"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const products = [
  {
    id: 1,
    name: "Strawberry Bliss",
    price: 4.99,
    image: "/images/StrawberryDonut.png",
    tags: ["glazed", "fruit", "bestseller"],
  },
  {
    id: 2,
    name: "Chocolate Dream",
    price: 5.49,
    image: "/images/ChocolateDonut.png",
    tags: ["chocolate", "bestseller"],
  },
  {
    id: 3,
    name: "Vanilla Cloud",
    price: 4.49,
    image: "/images/VanillaDonut.png",
    tags: ["glazed", "classic"],
  },
  {
    id: 4,
    name: "Maple Bacon",
    price: 6.99,
    image: "/images/MapleBaconDonut.png",
    tags: ["specialty", "savory"],
  },
  {
    id: 5,
    name: "Blueberry Burst",
    price: 5.29,
    image: "/images/BlueberryDonut.png",
    tags: ["fruit", "glazed"],
  },
  {
    id: 6,
    name: "Caramel Crunch",
    price: 5.99,
    image: "/images/CaramelDonut.png",
    tags: ["specialty", "nuts"],
  },
  {
    id: 7,
    name: "Matcha Green Tea",
    price: 5.49,
    image: "/images/MatchaDonut.png",
    tags: ["specialty", "vegan"],
  },
  {
    id: 8,
    name: "Lemon Poppy",
    price: 4.79,
    image: "/images/LemonDonut.png",
    tags: ["fruit", "vegan"],
  },
]

// All unique tags
const allTags = [...new Set(products.flatMap((product) => product.tags))]

export default function ProductGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addToCart, toggleFavorite, isInFavorites } = useShop()

  const filteredProducts =
    selectedTags.length > 0
      ? products.filter((product) => selectedTags.some((tag) => product.tags.includes(tag)))
      : products

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: <ToastAction altText="View cart">View cart</ToastAction>,
    })
  }

  const handleToggleFavorite = (id: number, name: string) => {
    toggleFavorite(id)
    toast({
      title: isInFavorites(id) ? "Removed from favorites" : "Added to favorites",
      description: `${name} has been ${isInFavorites(id) ? "removed from" : "added to"} your favorites.`,
    })
  }

  return (
    <div>
      {/* Filter tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`
              cursor-pointer text-sm px-4 py-2 rounded-full capitalize
              ${
                selectedTags.includes(tag)
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "hover:bg-pink-100 dark:hover:bg-pink-900"
              }
            `}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Product grid */}
      <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              <Card className="overflow-hidden border-pink-100 dark:border-pink-900 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-square">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`rounded-full ${
                        isInFavorites(product.id) ? "bg-pink-100 dark:bg-pink-900" : "bg-white/80 dark:bg-zinc-800/80"
                      } backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleToggleFavorite(product.id, product.name)
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInFavorites(product.id) ? "fill-pink-500 text-pink-500" : "text-pink-500"
                        }`}
                      />
                      <span className="sr-only">
                        {isInFavorites(product.id) ? "Remove from favorites" : "Add to favorites"}
                      </span>
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4 flex-grow">
                  <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                  <Button
                    size="sm"
                    className="rounded-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
