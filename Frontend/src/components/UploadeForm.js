import React, { useState } from 'react';

function UploadForm({ onSubmit }) {
  const [product, setProduct] = useState({
    name: '',
    variety: '',
    origin: '',
    currentPrice: '',
    biddingDeadline: '',
    description: '',
    weight: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({
      name: '',
      variety: '',
      origin: '',
      currentPrice: '',
      biddingDeadline: '',
      description: '',
      weight: '',
      image: null,
    });
  };

  return (
    <div className=" max-w-3xl px-4 mx-auto sm:px-8 py-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl border-2 rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="variety">
            Variety
          </label>
          <input
            type="text"
            name="variety"
            value={product.variety}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="origin">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            value={product.origin}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="currentPrice">
            Current Price ($)
          </label>
          <input
            type="number"
            name="currentPrice"
            value={product.currentPrice}
            onChange={handleChange}
            required
            step="0.01"
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="biddingDeadline">
            Bidding Deadline
          </label>
          <input
            type="datetime-local"
            name="biddingDeadline"
            value={product.biddingDeadline}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            required
            step="0.01"
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 text-md font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out w-full"
        >
          List Product
        </button>
      </form>
    </div>
  );
}

export default UploadForm;