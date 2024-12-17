import React, { useState, useContext } from "react";
import { Store } from "../Store/Store";
import { useAppKitAccount } from "@reown/appkit/react";

// Component to display purchased items
function PurchaseList() {
  const { listedNftData, listNftForSale } = useContext(Store);
  const { address } = useAppKitAccount();
  const [showInput, setShowInput] = useState(null); // Track which NFT is being listed
  const [price, setPrice] = useState("");
  const [auctionStatus, setAuctionStatus] = useState(false);
  const [biddingDeadline, setBiddingDeadline] = useState("");

  // Filter owned but unlisted NFTs
  const ownedUnlistedNfts = listedNftData?.filter(
    (item) =>
      item?.seller?.toLowerCase() === address?.toLowerCase() &&
      !item?.isListedOnSale
  );

  function convertToUnixTimestamp(dateString) {
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  }

  // Handle listing NFT for sale
  const handleListNftForSale = (itemId) => {
    if (price && !isNaN(price)) {
      const timestamp = convertToUnixTimestamp(biddingDeadline);
      listNftForSale(itemId, price, timestamp, auctionStatus);
      // Reset input fields and hide input
      setPrice("");
      setAuctionStatus(false);
      setShowInput(null);
    } else {
      alert("Please enter a valid price");
    }
  };

  const toggleAuctionStatus = (itemId) => {
    // Toggle auction status logic (can update state or contract)
    setAuctionStatus(!auctionStatus);
    console.log(`Toggling auction for NFT ${itemId}`);
  };
  return (
    <>
      <div className="flex flex-wrap justify-center mt-20">
        {ownedUnlistedNfts?.map((item, index) => (
          <div key={index}>
            <div className="bg-white rounded-lg shadow-lg">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {item?.name}
                </h1>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Farmer:</strong>{" "}
                    {`${item?.farmer?.slice(0, 6)}...${item?.farmer?.slice(
                      -6
                    )}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Origin:</strong> {item?.origin}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Weight:</strong> {item?.weight} kg
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Base Price:</strong> ETH
                    {item?.basePrice?.toString()}
                  </p>
                </div>

                <div className="mt-4">
                  {/* Price Input */}
                  <div className="mb-4">
                    <input
                      type="number"
                      value={price} // Bind price state to input
                      onChange={(e) => setPrice(e.target.value)} // Update the price state
                      placeholder="Enter price in ETH"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Auction Checkbox */}
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={auctionStatus} // Bind auction status to checkbox
                        onChange={() => toggleAuctionStatus(true)} // Toggle auction status
                        className="form-checkbox"
                      />
                      <span className="ml-2">Auction</span>
                    </label>
                  </div>

                  {/* Auction Deadline Date and Time Picker */}
                  {auctionStatus && (
                    <div className="mb-4">
                      <label
                        htmlFor="biddingDeadline"
                        className="block text-sm text-gray-600"
                      >
                        <strong>Bidding Deadline:</strong>
                      </label>
                      <input
                        type="datetime-local"
                        id="biddingDeadline"
                        name="biddingDeadline"
                        value={biddingDeadline || ""} // Bind the state for bidding deadline
                        onChange={(e) => setBiddingDeadline(e.target.value)} // Update the state with selected date and time
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  )}

                  {/* List NFT for Sale Button */}
                  <button
                    onClick={() => handleListNftForSale(item?.itemId)}
                    className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-600 rounded"
                  >
                    List NFT for Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PurchaseList;
