import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [56], // BSC Mainnet
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    56: 'https://bsc-dataseed.binance.org/',
  },
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { active, account, activate, deactivate } = useWeb3React();

  const handleConnect = async (connector: any) => {
    try {
      await activate(connector);
    } catch (ex) {
      console.error("Failed to connect", ex);
    }
  };

  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Turbo Launchpad
          </Typography>
          <Button color="inherit" onClick={() => handleConnect(injected)}>
            Connect Wallet
          </Button>
          <Button color="inherit" onClick={() => handleConnect(walletconnect)}>
            WalletConnect
          </Button>
          {active && (
            <>
              <Button color="inherit" onClick={handleDisconnect}>
                Disconnect
              </Button>
              <Typography variant="body2" color="inherit" sx={{ ml: 2 }}>
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8, mb: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
