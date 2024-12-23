import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommercebackend-topaz.vercel.app/get-product')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products)
        } else {
          console.error('Failed to fetch products')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = async (productId) => {
    try {
      const response = await fetch('https://ecommercebackend-topaz.vercel.app/cart/addtocart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', productId, quantity: 1 }),
        credentials: 'include'
      })
      if (response.ok) {
        console.log('Product added to cart')
      } else {
        console.error('Failed to add product to cart')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.img || '/placeholder.svg?height=200&width=200'} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <p>Price:{" $"} {product.price}</p>
              <p>Category: {product.category}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product._id)} className="border">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

