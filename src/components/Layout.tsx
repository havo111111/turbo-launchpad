import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import MenuIcon from '@mui/icons-material/Menu';
import TokenIcon from '@mui/icons-material/Token';
import LaunchIcon from '@mui/icons-material/Launch';
import PortfolioIcon from '@mui/icons-material/AccountBalanceWallet';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useNavigate } from 'react-router-dom';

const injected = new InjectedConnector({
  supportedChainIds: [56], // BSC Mainnet
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    56: 'https://bsc-dataseed.binance.org/',
  },
});

const menuItems = [
  { text: 'Tokens', icon: <TokenIcon />, path: '/tokens' },
  { text: 'Create', icon: <LaunchIcon />, path: '/create' },
  { text: 'Portfolio', icon: <PortfolioIcon />, path: '/portfolio' },
  { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/leaderboard' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { active, account, activate, deactivate } = useWeb3React();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

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

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
