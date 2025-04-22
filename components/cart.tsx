"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { useShop } from "@/context/shop-context"

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useShop()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Your Cart
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      <Separator />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow py-12">
          <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-pink-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-center mb-6">
            Looks like you haven't added any donuts to your cart yet.
          </p>
          <Button>Start Shopping</Button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-auto py-4">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 py-3"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-pink-100 dark:bg-pink-900/30 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">${item.price.toFixed(2)}</p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease</span>
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase</span>
                        </button>
                      </div>

                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-4">
            <Separator className="mb-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
