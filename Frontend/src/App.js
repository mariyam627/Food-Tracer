import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Uploadpage from "./pages/Uploadpage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import BidPage from "./pages/BidPage";
import WalletConnect from "./pages/WalletConnect";
import {
  useAppKitAccount,
  useAppKitEvents,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit/react";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store/Store";
import Loader from "./Models/Loader";

function App() {
  const { GetIsUserRegistered, setCanCall, loader, isRegistered } =
    useContext(Store);

  const nevigate = useNavigate();

  const { address, isConnected } = useAppKitAccount();

  // const HandleIsUserRegister = async () => {
  //   console.log(isRegistered, "IsRegisteredIsRegistered");
  //   if (isConnected) {
  //     if (!isRegistered) {
  //       nevigate("/signUp");
  //     } else {
  //       nevigate("/marketplace");
  //     }
  //   } else {
  //     nevigate("/");
  //   }
  // };

  //   canCall
  // setCanCall
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetIsUserRegistered();
        console.log("🚀 ~ fetchData ~ result:", result);

        if (result) {
          setCanCall(true);
        }
      } catch (error) {
        console.error("Error in GetIsUserRegistered:", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <>
      {loader && <Loader />}
      <Routes>
        {/* wallet connect */}
        <Route path="/" element={<WalletConnect />} />

        {/* upload */}
        <Route path="/list" element={<Uploadpage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* selling */}
        <Route path="/purchase-history" element={<Dashboard />} />

        {/* marketplace
         */}
        <Route path="/marketplace" element={<Home />} />
        <Route path="marketplace/bid/:id" element={<BidPage />} />

      </Routes>
     
    </>
  );
}

export default App;
