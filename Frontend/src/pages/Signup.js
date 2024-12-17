import React, { useContext, useEffect, useState } from "react";
import SelectComp from "../components/SelectComp";
import { Store } from "../Store/Store";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { registerNewUser, canCall, HandleIsUserRegister } = useContext(Store);
  const { address, isConnected } = useAppKitAccount();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
  });

  const nevigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("FormData:", formData);
    let retult = await registerNewUser(formData);
    if (retult) {
      nevigate("/marketplace");
    }
  };

  const { walletProvider } = useAppKitProvider("eip155");

  useEffect(() => {
    if (canCall) {
      HandleIsUserRegister();
    }
  }, [address, canCall]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          backgroundImage: ` url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG6YkqMmxeFcMT4LQhoXhKiejXkUrpDSHtDQ&usqp=CAU")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            width: "510px",
            height: "630px",
            backgroundColor: "#F6FBF9",
          }}
          class=" flex flex-col absolute  justify-center items-center  px-4 py-8  rounded-3xl shadow sm:px-6 md:px-8 lg:px-10"
        >
          <div class="self-center mb-2 karla font-black  text-black text-4xl ">
            Create An Account
          </div>
          <div class="text-center mx-10  karla  ">
            Create an account to enjoy all the services
          </div>
          <div class="mt-8">
            <form onSubmit={handleSubmit}>
              <div class="flex flex-col mb-1">
                <div class="flex relative ">
                  <input
                    type="text"
                    required
                    name="name"
                    defaultValue={formData.name}
                    id="name"
                    class=" rounded-xl flex-1 appearance-none w-[427px] border border-gray-300  h-12 mb-3 py-2 px-4 bg-white text-gray-800 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-1">
                <div class="flex relative ">
                  <input
                    type="email"
                    required
                    name="email"
                    defaultValue={formData.email}
                    id="email"
                    class=" rounded-xl flex-1 appearance-none w-[427px] border border-gray-300  h-12 mb-3 py-2 px-4 bg-white text-gray-800 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="flex flex-col mb-4">
                <div class="flex relative ">
                  <input
                    type="tel"
                    required
                    name="phone_number"
                    defaultValue={formData.phone_number}
                    id="phone_number"
                    class=" rounded-xl flex-1 w-[427px] appearance-none border border-gray-300  h-12 py-2 px-4 bg-white text-gray-800 placeholder-gray-600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <SelectComp formData={formData} handleChange={handleChange} />

              <div style={{ flexDirection: "column" }} class="flex w-full ">
                <button
                  type="submit"
                  style={{ fontSize: "20px", backgroundColor: "#f6851b" }}
                  class="py-2 px-4 text-xl mt-2 focus:ring-black-500 focus:ring-offset-black-200 text-white w-[300px] transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-2xl h-14 mx-auto"
                >
                  signUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
