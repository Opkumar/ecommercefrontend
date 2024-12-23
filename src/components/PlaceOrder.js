import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const cartResponse = await fetch('https://ecommercebackend-main-drab.vercel.app/cart/get-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!cartResponse.ok) throw new Error('Failed to fetch cart');
        const cartData = await cartResponse.json();

        const productResponse = await fetch('https://ecommercebackend-main-drab.vercel.app/get-product');
        if (!productResponse.ok) throw new Error('Failed to fetch products');
        const productData = await productResponse.json();

        const productMap = productData.products.reduce((map, product) => {
          map[product._id] = product;
          return map;
        }, {});

        setCartItems(cartData.cart.productsInCart);
        setProducts(productMap);
        calculateTotal(cartData.cart.productsInCart, productMap);
      } catch (err) {
        setError(err.message || 'Error fetching cart and products');
      }
    };

    fetchCartAndProducts();
  }, []);

  const calculateTotal = (items, productMap) => {
    const totalAmount = items.reduce((sum, item) => {
      const product = productMap[item.productId];
      return sum + (product ? product.price * item.productQty : 0);
    }, 0);
    setTotal(totalAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!address || !paymentMethod) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not logged in');
        setIsLoading(false);
        return;
      }

      const orderResponse = await fetch('https://ecommercebackend-main-drab.vercel.app/order/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          items: cartItems,
          total,
          address,
          paymentMethod,
        }),
      });

      if (!orderResponse.ok) throw new Error('Failed to place order');

      const clearCartResponse = await fetch('https://ecommercebackend-main-drab.vercel.app/cart/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!clearCartResponse.ok) throw new Error('Failed to clear cart after placing order');

      setCartItems([]);
      navigate('/order-confirmation');
    } catch (err) {
      setError(err.message || 'Error placing order');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item) => {
              const product = products[item.productId];
              return (
                <li key={item.productId} className="flex justify-between">
                  <span>
                    {product?.name || 'Unknown Product'} x {item.productQty}
                  </span>
                  <span>${(product?.price * item.productQty).toFixed(2) || '0.00'}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 text-xl font-bold">Total: ${total.toFixed(2)}</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping and Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Shipping Address
              </label>
              <textarea
                id="address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select a payment method</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
