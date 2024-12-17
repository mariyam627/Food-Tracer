import React from 'react';

// Component to display listed products
function ListedProducts({ listings }) {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">My Listed Products</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full rounded-lg shadow-md border border-gray-300">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100">
                <th scope="col" className="px-4 py-3 text-sm font-medium text-left text-gray-700 uppercase border-b border-gray-300">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-left text-gray-700 uppercase border-b border-gray-300">
                  Farmer
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-left text-gray-700 uppercase border-b border-gray-300">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-left text-gray-700 uppercase border-b border-gray-300">
                  Current Price
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-medium text-left text-gray-700 uppercase border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-4 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900">{item.name}</p>
                  </td>
                  <td className="px-4 py-4 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900">{item.farmerName}</p>
                  </td>
                  <td className="px-4 py-4 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900">{item.quantityAvailable} kg</p>
                  </td>
                  <td className="px-4 py-4 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900">${item.currentPrice}</p>
                  </td>
                  <td className="px-4 py-4 text-sm bg-white border-b border-gray-300">
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase bg-blue-600 rounded hover:bg-blue-500 transition duration-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListedProducts;