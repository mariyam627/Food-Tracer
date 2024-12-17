import React, { useContext, useEffect } from "react";
import NavComp from "../components/NavComp";
import CardComponent from "../components/CardComponent";
import PurchaseList from "../components/PurchaseList";
import ListedProducts from "../components/ListedProduct";
import { Store } from "../Store/Store";
import { useAppKitAccount } from "@reown/appkit/react";

function Dashboard() {
  const { loadMarketplaceItems } = useContext(Store);
  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    loadMarketplaceItems();
  }, [address]);

  return (
    <>
      <NavComp />
      {/* 
        not that important

      <div className="flex justify-center items-center my-4">
        <CardComponent />
      </div> */}

      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold text-center text-gray-800 my-4"> */}
        {/* My Product Dashboard */}
        {/* </h1> */}
        <PurchaseList />
        {/* <ListedProducts listings={listings} /> */}
      </div>
    </>
  );
}

export default Dashboard;
