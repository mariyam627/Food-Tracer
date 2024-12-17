import React, { useContext, useEffect } from "react";
import NavComp from "../components/NavComp";
import ProductComponent from "../components/ProductComponent";
import { useNavigate } from "react-router-dom";
import {
  useAppKitAccount,
  useAppKitProvider,
  useWalletInfo,
} from "@reown/appkit/react";
import { Store } from "../Store/Store";

function Home() {
  const { walletInfo } = useWalletInfo();

  const { loadMarketplaceItems, canCall, isRegistered, HandleIsUserRegister } =
    useContext(Store);

  const { address, isConnected, chain } = useAppKitAccount();

  let nevigate = useNavigate();

  useEffect(() => {
    if (canCall) {
      HandleIsUserRegister();
    }
  }, [address, canCall]);

  useEffect(() => {
    loadMarketplaceItems();
  }, [address]);
  return (
    <>
      <NavComp />
      <ProductComponent />
    </>
  );
}

export default Home;
