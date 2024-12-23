import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    img: '',
    category: '',
    rating: '',
    productId: '',
    inStockValue: '',
    soldStockValue: '',
    visibility: 'on',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ecommercebackend-topaz.vercel.app/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setProductData({
          name: '',
          price: '',
          img: '',
          category: '',
          rating: '',
          productId: '',
          inStockValue: '',
          soldStockValue: '',
          visibility: 'on',
        });
      } else {
        setMessage(data.message || 'Error adding product');
      }
    } catch (error) {
      setMessage('Error adding product');
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {message && <p className={`text-${message.includes('Error') ? 'red' : 'green'}-600`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={productData.img}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={productData.rating}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={productData.productId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          name="inStockValue"
          placeholder="Stock Value"
          value={productData.inStockValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="number"
          name="soldStockValue"
          placeholder="Sold Stock Value"
          value={productData.soldStockValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          required
        />
        <select
          name="visibility"
          value={productData.visibility}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        >
          <option value="on">Visible</option>
          <option value="off">Hidden</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
