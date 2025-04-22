"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, X } from "lucide-react"
import { useShop, Product } from "@/context/shop-context"
import { toast } from "@/components/ui/use-toast"

const products: Product[] = [
  {
    id: 1,
    name: "Strawberry Bliss",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["glazed", "fruit", "bestseller"],
  },
  {
    id: 2,
    name: "Chocolate Dream",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["chocolate", "bestseller"],
  },
  {
    id: 3,
    name: "Vanilla Cloud",
    price: 4.49,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["glazed", "classic"],
  },
  {
    id: 4,
    name: "Maple Bacon",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["specialty", "savory"],
  },
  {
    id: 5,
    name: "Blueberry Burst",
    price: 5.29,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["fruit", "glazed"],
  },
  {
    id: 6,
    name: "Caramel Crunch",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["specialty", "nuts"],
  },
  {
    id: 7,
    name: "Matcha Green Tea",
    price: 5.49,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["specialty", "vegan"],
  },
  {
    id: 8,
    name: "Lemon Poppy",
    price: 4.79,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["fruit", "vegan"],
  },
]

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart } = useShop()

  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  const handleRemoveFromFavorites = (id: number, name: string) => {
    toggleFavorite(id)
    toast({
      title: "Removed from favorites",
      description: `${name} has been removed from your favorites.`,
    })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Heart className="mr-2 h-5 w-5 fill-pink-500 text-pink-500" />
          Your Favorites
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? "item" : "items"}
        </span>
      </div>

      <Separator />

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow py-12">
          <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your favorites list is empty</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-center mb-6">
            Looks like you haven't added any donuts to your favorites yet.
          </p>
          <Button>Start Shopping</Button>
        </div>
      ) : (
        <div className="flex-grow overflow-auto py-4">
          <AnimatePresence initial={false}>
            {favoriteProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 py-3"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name}</h3>
                    <button
                      onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">${product.price.toFixed(2)}</p>

                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {favoriteProducts.length > 0 && (
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <Button
            size="lg"
            className="w-full bg-pink-500 hover:bg-pink-600"
            onClick={() => {
              favoriteProducts.forEach((product) => addToCart(product))
              toast({
                title: "Added all to cart",
                description: "All your favorite items have been added to your cart.",
              })
            }}
          >
            Add All to Cart
          </Button>
        </div>
      )}
    </div>
  )
}
