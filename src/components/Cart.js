import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://ecommercebackend-topaz.vercel.app/cart/get-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'user123' }),
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cart.productsInCart);
        } else {
          console.error('Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommercebackend-topaz.vercel.app/get-product');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const filteredProducts = data.products.filter(product =>
              cartItems.some(item => item.productId === product._id)
            );
            setProducts(filteredProducts);
          }
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch('https://ecommercebackend-topaz.vercel.app/cart/delete-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', productId }),
        credentials: 'include'
      });
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const proceedToCheckout = () => {
    navigate('/place-order');
  };

  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p._id === item.productId);
    return sum + (product ? parseFloat(product.price) * item.productQty : 0);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <Card key={item.productId}>
                <CardHeader>
                  <CardTitle>{item.name || 'Product'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={item.img || '/placeholder.svg?height=200&width=200'}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <p>Quantity: {cartItems.find(cartItem => cartItem.productId === item.productId)?.productQty}</p>
                  <p>Price: ${item.price || 'N/A'}</p>
                </CardContent>
                <CardFooter>
                  <Button className="border" variant="destructive" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={proceedToCheckout}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}



// import { useState, useEffect } from 'react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
// import { Button } from "./ui/button"

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([])
//   const [products, setProducts] = useState([])
  

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/cart/get-cart', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userId: 'user123' }),
//           credentials: 'include'
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setCartItems(data.cart.productsInCart)
//         } else {
//           console.error('Failed to fetch cart')
//         }
//       } catch (error) {
//         console.error('Error:', error)
//       }
//     }

//     fetchCart()
//   }, [])


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/get-product')
//         if (response.ok) {
//           const data = await response.json()
//           if (data) {
//             // Filter the products that match the productId in the cartItems
//             const filteredProducts = data.products.filter(product =>
//               cartItems.some(item => 
//                 item.productId === product._id
//                 // console.log(item.productId)
//               )
//             )
//             setProducts(filteredProducts)
//           }
//         } else {
//           console.error('Failed to fetch products')
//         }
//       } catch (error) {
//         console.error('Error:', error)
//       }
//     }

//     // Only fetch products if there are cart items
//     if (cartItems.length > 0) {
//       fetchProducts()
//     }
//   }, [cartItems]) // Trigger this effect when cartItems change

//   const removeFromCart = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:4000/cart/delete-items', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: 'user123', productId }),
//         credentials: 'include'
//       })
//       // console.log(productId)
//       if (response.ok) {
//         setCartItems(cartItems.filter(item =>
//            item.productId !== productId
          
//           ))
//       } else {
//         console.error('Failed to remove item from cart')
//       }
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((item) => (
//             <Card key={item.productId}>
//               <CardHeader>
//                 <CardTitle>{item.name || 'Product'}</CardTitle>
//               </CardHeader>
//               <CardContent>
//               <img src={item.img || '/placeholder.svg?height=200&width=200'} alt={item.name} className="w-full h-48 object-cover mb-4" />
//                 <p>Quantity: {cartItems.find(cartItem => cartItem.productId === item.productId)?.productQty}</p>
//                 <p>Price: {item.price || 'N/A'}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button className="border" variant="destructive" onClick={() => removeFromCart(item._id)}>Remove</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
