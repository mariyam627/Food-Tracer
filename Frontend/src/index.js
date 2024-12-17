import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3Modal } from "./Store/Web3Modal";
import { StoreProvider } from "./Store/Store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Web3Modal>
        <StoreProvider>
          <App />
          <ToastContainer />
        </StoreProvider>
      </Web3Modal>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
