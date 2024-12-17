import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store/Store";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const BidComponent = ({ id }) => {
    const nevigate = useNavigate()
    
  const { listedNftData,loadMarketplaceItems, placeBid } = useContext(Store);

  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPrice =
      product?.highestBid?.toString() > 0
        ? product?.highestBid?.toString()
        : product?.basePrice?.toString();

    if (parseFloat(bidAmount) <= currentPrice) {
      setMessage(
        `Your bid must be higher than the current price of $${currentPrice}.`
      );
      return;
    }

    let result = await placeBid(product?.itemId, bidAmount);
    if (result) {
      setMessage(`Bid of $${bidAmount} placed successfully!`);
      setBidAmount("");
      nevigate("/")
    } else {
      setMessage(`Try Again!`);
    }
  };

  useEffect(() => {
    console.log(listedNftData, "listedNftData");
    console.log(id?.toString(), "?.toString()");
    const main = async () =>{
        let check = await  loadMarketplaceItems();

        if(check){
            const currentItem = listedNftData.find(
                (item) => item?.itemId?.toString() === id?.toString()
              );
              console.log(currentItem, "currentItem");
              setProduct(currentItem);
        }
    }
    main();
  }, [id]);



  return (
    <div className="max-w-lg bg-white mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Place Your Bid</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {product?.name} ({product?.variety})
        </h2>
        <p className="text-gray-700">
          <strong>Origin:</strong> {product?.origin}
        </p>
        <p className="text-gray-700">
          <strong>Base Price:</strong> ${product?.basePrice?.toString()}
        </p>
        <p className="text-gray-700">
          <strong>Highest Bid:</strong> ${product?.highestBid}
        </p>
        <p className="text-gray-700">
          <strong>Bidding Deadline:</strong>{" "}
          {new Date(product?.time)?.toLocaleString()}
        </p>
        <p className="text-gray-600">{product?.description}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="py-3">
          <label className="block text-sm font-medium text-gray-700">
            Your Bid Amount:
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={product?.basePrice + 0.00001}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Place Bid
        </button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default BidComponent;
