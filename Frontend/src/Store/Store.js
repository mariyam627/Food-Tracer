import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import FoodTraceabilityContractAddress from "./contractsData/FoodTraceabilityContract-address.json";
import FoodTraceabilityContract from "./contractsData/FoodTraceabilityContract.json";

import FoodTraceabilityMarketplaceAddress from "./contractsData/FoodTraceabilityMarketplace-address.json";
import FoodTraceabilityMarketplace from "./contractsData/FoodTraceabilityMarketplace.json";

import { ToastContainer, toast } from "react-toastify";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Loader from "../Models/Loader";
import WalletConnect from "../pages/WalletConnect";
import Signup from "../pages/Signup";

export const Store = createContext();

const getMarketPalceInstance = async () => {
  const RPCURl = process.env.REACT_APP_RPC;
  const ethersProvider = new ethers.providers.Web3Provider(RPCURl);
  const FoodMarketplaceContract = new ethers.Contract(
    FoodTraceabilityMarketplaceAddress.address,
    FoodTraceabilityMarketplace.abi,
    ethersProvider
  );
  return FoodMarketplaceContract;
};

export const StoreProvider = ({ children }) => {
  const { address, isConnected } = useAppKitAccount();

  const { walletProvider } = useAppKitProvider("eip155");

  const [loader, setloader] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const [canCall, setCanCall] = useState(false);

  const [listedNftData, setListedNftData] = useState([]);

  const [userData, setUserDaat] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
  });

  let nevigate = useNavigate();

  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////

  const HandleIsUserRegister = async () => {
    console.log(isRegistered, "IsRegisteredIsRegistered");
    if (isConnected) {
      if (!isRegistered) {
        nevigate("/signUp");
      } else {
        nevigate("/marketplace");
      }
    } else {
      nevigate("/");
    }
  };

  const GetIsUserRegistered = async () => {
    try {
      if (isConnected) {
        //setloader(true);
        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );

        const signer = ethersProvider.getSigner();

        const FoodMarketplaceContract = new ethers.Contract(
          FoodTraceabilityMarketplaceAddress.address,
          FoodTraceabilityMarketplace.abi,
          signer
        );

        const IsRegistered = await FoodMarketplaceContract.registerationAccount(
          address
        );

        setIsRegistered(IsRegistered?.isRegister);

        setUserDaat((prev) => ({
          ...prev,
          name: IsRegistered?.name,
          email: IsRegistered?.email,
          phone_number: IsRegistered?.phone_number,
          role: IsRegistered?.role,
        }));
        console.log(IsRegistered, "IsRegistered`1");
        // setloader(false);
        return true;
      }
    } catch (error) {
      setloader(false);
      console.log(error);
      // toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const registerNewUser = async (data) => {
    try {
      setloader(true);

      if (!walletProvider) {
        throw new Error("Wallet provider is not defined.");
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

      const signer = ethersProvider.getSigner();

      const FoodMarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const regis = await FoodMarketplaceContract.registerAsUser(
        data?.name,
        data?.email,
        data?.phone_number,
        data?.role
      );
      regis.wait();
      await GetIsUserRegistered();
      await HandleIsUserRegister();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
      return true;
    } catch (error) {
      setloader(false);
      console.log(error);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const mintThenList = async (price, deadline, jsonUrl) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      setloader(true);

      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const NFTContract = new ethers.Contract(
        FoodTraceabilityContractAddress.address,
        FoodTraceabilityContract.abi,
        signer
      );

      const minting = await NFTContract.mint(jsonUrl);
      await minting.wait();

      let amountInWei = ethers.utils.parseEther(price?.toString());

      const tokenId = await NFTContract.tokenCount();

      // let nftApprove = await NFTContract.setApprovalForAll(
      //     FoodTraceabilityMarketplaceAddress.address,
      //     true
      //   );
      // await nftApprove.wait();

      let nftApprove = await NFTContract.approve(
        FoodTraceabilityMarketplaceAddress.address,
        tokenId?.toString()
      );

      await nftApprove.wait();

      const listOnAuction = await MarketplaceContract.createItems(
        tokenId?.toString(),
        amountInWei,
        deadline
      );
      await listOnAuction.wait();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
    } catch (error) {
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
      console.log(error);
    }
  };

  function isAuctionEnded(endTime) {
    const currentTime = new Date().getTime();
    const endTimeInMillis = endTime * 1000;
    return currentTime >= endTimeInMillis;
  }

  const loadMarketplaceItems = async () => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const NFTContract = new ethers.Contract(
        FoodTraceabilityContractAddress.address,
        FoodTraceabilityContract.abi,
        signer
      );

      const itemCount = await MarketplaceContract?.ListdItems();
      const totalItemsSale = await MarketplaceContract?.totalItemsSale();

      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await MarketplaceContract?.listedItemDetails(i);
        console.log("🚀 ~ loadMarketplaceItems ~ item:", item);

        // if (item?.isListedOnSale) {

        const temp = Number(item?.endTime?.toString());

        const uri = await NFTContract?.tokenURI(i);
        console.log(uri, "uriuriuri");
        const response = await fetch(uri);
        const metadata = await response.json();

        console.log(metadata, "metadatametadata");

        let purchaseHistory = {};

        try {
          if (+totalItemsSale?.toString() > 0) {
            const buyHistory = await MarketplaceContract?.getBuyHistory(i);
            console.log(buyHistory, "buyHistorybuyHistorybuyHistory");
            purchaseHistory = buyHistory?.map((buy) => ({
              buyer: buy?.buyer,
              price: formatEther(buy?.price?.toString()),
              timestamp: new Date(
                buy?.timestamp?.toNumber() * 1000
              )?.toLocaleString(),
            }));
          }
        } catch (error) {
          console.log(error);
        }

        items.push({
          isListedOnSale: item?.isListedOnSale,
          time: temp,
          basePrice: formatEther(item?.basePrice?.toString()),
          itemId: i,
          seller: item?.seller,
          farmer: item?.farmer,
          name: metadata?.name?.toString(),
          description: metadata?.description,
          image: metadata?.image,
          weight: metadata?.attributes[2]?.value,
          variety: metadata?.attributes[0]?.value,
          origin: metadata?.attributes[1]?.value,
          highestBid: formatEther(item?.highestBid?.toString()),
          highestBidder: item?.highestBidder,
          isAuctionEnded: isAuctionEnded(temp),
          sallerRole: item?.sallerRole,
          productCropTime: item?.mintTime?.toString(),
          purchaseHistory: purchaseHistory,
        });
        // }
      }
      console.log(items, "itemsitemsitems");
      setListedNftData(items);
      return true;
    } catch (error) {
      console.log(error, "GetListedError");
      setloader(false);
      return false;
    }
  };

  const cancelListedNft = async (itemId) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (await MarketplaceContract.cancellItems(itemId)).wait();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
    } catch (error) {
      setloader(false);
      console.log(error);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const listNftForSale = async (itemId, price, deadline, isAcution) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const NFTContract = new ethers.Contract(
        FoodTraceabilityContractAddress.address,
        FoodTraceabilityContract.abi,
        signer
      );

      let nftApprove = await NFTContract.approve(
        FoodTraceabilityMarketplaceAddress.address,
        itemId?.toString()
      );

      await nftApprove.wait();

      let priceInWei = ethers.utils.parseEther(price?.toString());

      setloader(true);
      if (isAcution) {
        await (
          await MarketplaceContract.sellItem(
            itemId,
            priceInWei,
            deadline,
            isAcution
          )
        ).wait();
      } else {
        await (
          await MarketplaceContract.sellItem(itemId, priceInWei, "0", false)
        ).wait();
      }
      setloader(false);
      toast.success(`Transaction Successfully Success`);
    } catch (error) {
      setloader(false);
      console.log(error);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const concludeAuction = async (itemId) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (await MarketplaceContract.concludeItems(itemId)).wait();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
    } catch (error) {
      setloader(false);
      console.log(error);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const buyMarketItem = async (itemId, totalPrice) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (
        await MarketplaceContract.purchaseItem(itemId, {
          value: totalPrice,
        })
      ).wait();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
    } catch (error) {
      console.log(error);
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
    }
  };

  const placeBid = async (itemId, price) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      setloader(true);
      const bidding = ethers.utils.parseEther(price);
      console.log(itemId, bidding?.toString(), "bidddddddddddddddddd");
      await (
        await MarketplaceContract.bid(itemId, { value: bidding?.toString() })
      ).wait();
      setloader(false);
      toast.success(`Transaction Successfully Success`);
      return true;
    } catch (error) {
      setloader(false);
      console.log(error);
      toast.error(`${JSON.stringify(error.reason)}`);
      return false;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// GET FUNCTIONS /////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    GetIsUserRegistered();
  }, [address]);

  console.log(isRegistered, "isRegistered");

  return (
    <>
      <Store.Provider
        value={{
          isRegistered,
          HandleIsUserRegister,
          listNftForSale,
          GetIsUserRegistered,
          registerNewUser,
          mintThenList,
          loadMarketplaceItems,
          listedNftData,
          cancelListedNft,
          userData,
          concludeAuction,
          buyMarketItem,
          placeBid,
          canCall,
          setCanCall,
          loader,
          setloader,
        }}
      >
        {isConnected ? isRegistered ? children : <Signup /> : <WalletConnect />}
      </Store.Provider>
    </>
  );
};
