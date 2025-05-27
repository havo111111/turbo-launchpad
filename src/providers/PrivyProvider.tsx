import React, { createContext, useContext, useEffect, useState } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { ethers } from 'ethers';

interface PrivyContextType {
  wallet: Record<string, any> | null;
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

  useEffect(() => {
    console.log('Privy config:', {
      appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      hasSecret: !!process.env.PRIVY_APP_SECRET
    });
  }, []);

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
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cmb5x1t1w00ihl20m4oyfw2vp"}
        secret={process.env.PRIVY_APP_SECRET}
        config={{
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
