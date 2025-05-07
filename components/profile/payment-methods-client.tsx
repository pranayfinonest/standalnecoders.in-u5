"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Trash2, Plus, Check } from "lucide-react"

export default function PaymentMethodsClient() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load payment methods from localStorage
    const storedMethods = JSON.parse(localStorage.getItem("paymentMethods") || "[]")

    if (storedMethods.length === 0) {
      // Add sample payment method if none exist
      const sampleMethod = {
        id: "1",
        cardNumber: "**** **** **** 4242",
        cardName: "John Doe",
        expiryDate: "12/25",
        isDefault: true,
        type: "visa",
      }
      localStorage.setItem("paymentMethods", JSON.stringify([sampleMethod]))
      setPaymentMethods([sampleMethod])
    } else {
      setPaymentMethods(storedMethods)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCard({ ...newCard, [name]: value })
  }

  const handleAddCard = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Format card number with asterisks
      const formattedCardNumber = "**** **** **** " + newCard.cardNumber.slice(-4)

      // Create new card object
      const cardToAdd = {
        id: Date.now().toString(),
        cardNumber: formattedCardNumber,
        cardName: newCard.cardName,
        expiryDate: newCard.expiryDate,
        isDefault: newCard.isDefault,
        type: getCardType(newCard.cardNumber),
      }

      // If this is the default card, update other cards
      let updatedMethods = [...paymentMethods]
      if (newCard.isDefault) {
        updatedMethods = updatedMethods.map((method) => ({
          ...method,
          isDefault: false,
        }))
      }

      // Add new card
      updatedMethods.push(cardToAdd)

      // Update state and localStorage
      setPaymentMethods(updatedMethods)
      localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods))

      // Reset form
      setNewCard({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
      })
      setIsAddingCard(false)
      setIsSubmitting(false)

      toast({
        title: "Card added",
        description: "Your payment method has been added successfully.",
      })
    }, 1500)
  }

  const handleDeleteCard = (id) => {
    // Get the card to delete
    const cardToDelete = paymentMethods.find((method) => method.id === id)

    // Filter out the card
    const updatedMethods = paymentMethods.filter((method) => method.id !== id)

    // If the deleted card was default, make the first remaining card default
    if (cardToDelete.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }

    // Update state and localStorage
    setPaymentMethods(updatedMethods)
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods))

    toast({
      title: "Card removed",
      description: "Your payment method has been removed.",
    })
  }

  const handleSetDefault = (id) => {
    // Update all cards, setting isDefault to true only for the selected card
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    // Update state and localStorage
    setPaymentMethods(updatedMethods)
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods))

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const getCardType = (cardNumber) => {
    // Simple card type detection based on first digit
    const firstDigit = cardNumber.charAt(0)
    if (firstDigit === "4") return "visa"
    if (firstDigit === "5") return "mastercard"
    if (firstDigit === "3") return "amex"
    if (firstDigit === "6") return "discover"
    return "generic"
  }

  const getCardIcon = (type) => {
    switch (type) {
      case "visa":
        return (
          <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-bold">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded text-xs font-bold">
            MC
          </div>
        )
      case "amex":
        return (
          <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
            AMEX
          </div>
        )
      case "discover":
        return (
          <div className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded text-xs font-bold">
            DISC
          </div>
        )
      default:
        return (
          <div className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 px-2 py-1 rounded text-xs font-bold">
            CARD
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <Button onClick={() => setIsAddingCard(true)} disabled={isAddingCard}>
          <Plus className="mr-2 h-4 w-4" /> Add Payment Method
        </Button>
      </div>

      {isAddingCard ? (
        <Card>
          <CardHeader>
            <CardTitle>Add Payment Method</CardTitle>
            <CardDescription>Add a new credit or debit card to your account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleAddCard}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  value={newCard.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newCard.isDefault}
                  onChange={(e) => setNewCard({ ...newCard, isDefault: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDefault">Set as default payment method</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => setIsAddingCard(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Card"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="space-y-4">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-blue-500" : ""}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-gray-500" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{method.cardNumber}</p>
                          {getCardIcon(method.type)}
                        </div>
                        <p className="text-sm text-gray-500">
                          {method.cardName} • Expires {method.expiryDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault ? (
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                          <Check className="h-4 w-4 mr-1" /> Default
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCard(method.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500 mb-4">You don't have any payment methods yet.</p>
                <Button onClick={() => setIsAddingCard(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
