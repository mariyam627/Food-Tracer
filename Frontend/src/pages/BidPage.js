import React, { useContext, useEffect } from "react";
import BidComponent from "../components/BidComponent";
import { useParams } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import { Store } from "../Store/Store";

function BidPage() {
  const { id } = useParams();
  const { canCall, HandleIsUserRegister } = useContext(Store);
  const { address } = useAppKitAccount();

  // useEffect(() => {
  //   if (canCall) {
  //     HandleIsUserRegister();
  //   }
  // }, [address, canCall]);

  console.log(id);
  return (
    <>
      <div className="flex  items-center justify-center min-h-screen bg-gray-100">
        <BidComponent id={id} />
      </div>
    </>
  );
}

export default BidPage;
