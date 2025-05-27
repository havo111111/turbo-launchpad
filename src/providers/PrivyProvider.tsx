import React, { createContext, useContext, useEffect, useState } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { ethers } from 'ethers';

interface PrivyContextType {
  wallet: any | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const PrivyContext = createContext<PrivyContextType>({
  wallet: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export const usePrivy = () => {
  return useContext(PrivyContext);
};

export const PrivyProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    // The Privy UI will automatically open when the user clicks the connect button
  };

  const disconnect = () => {
    setWallet(null);
    setIsConnected(false);
  };

  return (
    <PrivyContext.Provider
      value={{
        wallet,
        isConnected,
        connect,
        disconnect,
      }}
    >
      <PrivyProvider
        appId="YOUR_APP_ID" // You'll need to replace this with your actual Privy app ID
        config={{
          theme: 'dark',
          showQRCode: true,
          showWalletConnect: true,
          showEmail: true,
          showPhone: true,
          showSocial: true,
        }}
        onConnect={(wallet) => {
          setWallet(wallet);
          setIsConnected(true);
        }}
        onDisconnect={() => {
          disconnect();
        }}
      >
        {children}
      </PrivyProvider>
    </PrivyContext.Provider>
  );
};
