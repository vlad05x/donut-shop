"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for our context
export type Product = {
  id: number
  name: string
  price: number
  image: string
  tags?: string[]
}

type CartItem = Product & {
  quantity: number
}

type ShopContextType = {
  cartItems: CartItem[]
  favorites: number[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, delta: number) => void
  toggleFavorite: (id: number) => void
  isInFavorites: (id: number) => boolean
}

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined)

// Create provider component
export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Increase quantity if item exists
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favId) => favId !== id)
      } else {
        return [...prevFavorites, id]
      }
    })
  }

  const isInFavorites = (id: number) => {
    return favorites.includes(id)
  }

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        isInFavorites,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

// Create custom hook for using the context
export function useShop() {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}
