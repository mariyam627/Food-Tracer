import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store/Store";
const logo = require("../assets/logo-light.png");

function NavComp() {
  const { open } = useAppKit();
  const { userData } = useContext(Store);
  const { disconnect } = useDisconnect();

  const [hide, sethide] = useState(true);
  const s = {
    hid: {
      display: "none",
    },

    nohid: {
      display: "block",
    },
  };

  const { address, isConnected } = useAppKitAccount();



  // useEffect(() => {
  //   if (!isConnected) {
  //     nevigate("/");
  //   }
  // }, [address,isConnected]);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  console.log(userData?.role, "userData?.roleuseData?.roleuseData?.role");

  return (
    <>
      <div>
        <nav style={{ backgroundColor: "#023047" }} className="shadow">
          <div className="px-8 py-2 mx-auto max-w-7xl">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a className="flex-shrink-0" href="/marketplace">
                  <img className="w-20 h-20" src={logo} alt="Workflow" />
                </a>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <button
                      className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => handleNavigation("/marketplace")}
                    >
                      Marketplace
                    </button>
                    <button
                      className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => handleNavigation("/purchase-history")}
                    >
                      Purchase History
                    </button>
                    {userData?.role === "Farmer" && (
                      <button
                        className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => handleNavigation("/list")}
                      >
                        List Your Product
                      </button>
                    )}
                  </div>
                </div>
                <div className="justify-center items-center ml-28">
                  <button
                    onClick={() => handleNavigation("/marketplace")}
                    className="text-xl font-semibold text-white font-heading"
                  >
                    Food Tracer
                  </button>
                </div>
              </div>
              <div className="block">
                <div className="flex items-center ml-4 md:ml-6">
                  <div className="relative ml-3">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          onClick={() => sethide(!hide)}
                          className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                          id="options-menu"
                        >
                          <svg
                            width="20"
                            fill="currentColor"
                            height="20"
                            className="text-white"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                        </button>
                      </div>
                      <div
                        style={hide ? s.hid : s.nohid}
                        className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <button
                            onClick={() => open()}
                            className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Profile
                          </button>

                          <button
                            onClick={() => disconnect()}
                            className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                <button
                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  onClick={() => handleNavigation("/marketplace")}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="w-8 h-8"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavComp;
