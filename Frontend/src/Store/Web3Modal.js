import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, localhost } from "@reown/appkit/networks";

const projectId = process.env.REACT_APP_WALLET_CONNECT;

const metadata = {
  name: "FYP Project",
  description: "This is FYP Project website",
  url: "https://fyp.org/",
  icons: ["https://fyp.org/"],
};

// 3. Create the AppKit instance
createAppKit({
  defaultNetwork: localhost,
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [localhost],
  projectId,
  features: {
    swaps: false, // Disable swaps feature
    onramp: false, // Disable onramp feature
    email: false, // Disable email feature
    emailShowWallets: false, // Hide wallets when email is disabled
    socials: false, // Disable social media options
    history: false, // Disable history feature
    analytics: true, // Keep analytics enabled if needed
    allWallets: false, // Disable "All Wallets" feature
    smartSessions: false, // Disable smart sessions feature
  },
});

export function Web3Modal({ children }) {
  return children;
}
