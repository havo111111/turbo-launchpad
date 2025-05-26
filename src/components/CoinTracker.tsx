import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import PlaceholderImage from './PlaceholderImage';
import { useWeb3React } from '@web3-react/core';

interface Coin {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  timestamp: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  liquidity: number;
  holders: number;
  verified: boolean;
  favorite: boolean;
}

const CoinTracker: React.FC = () => {
  const { account, library } = useWeb3React();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchNewCoins = async () => {
      try {
        const newCoins = await fetch('https://api.turbo-launchpad.com/new-coins')
          .then(res => res.json());
        
        setCoins(newCoins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchNewCoins();
    const interval = setInterval(fetchNewCoins, 30000);

    return () => clearInterval(interval);
  }, [library]);

  const handleToggleFavorite = (address: string) => {
    setFavorites(prev => 
      prev.includes(address) 
        ? prev.filter(fav => fav !== address) 
        : [...prev, address]
    );
  };

  const handleSnipe = async (coin: Coin) => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Implement advanced sniping logic here
      console.log('Sniping coin:', coin);
    } catch (error) {
      console.error('Snipe failed:', error);
      alert('Snipe failed. Please try again.');
    }
  };

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Token Tracker
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth={!isMobile}
          size="small"
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceholderImage width={20} height={20} text="Search" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlaceholderImage width={20} height={20} text="Filter" />}
          sx={{ ml: isMobile ? 0 : 2 }}
        >
          Filters
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCoins.map((coin) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={coin.address}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 2,
                  border: coin.verified ? '2px solid #4caf50' : 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <PlaceholderImage width={200} height={150} text="Coin Tracker" />
                  <Typography variant="h6" component="div">
                    {coin.name}
                  </Typography>
                  <IconButton
                    onClick={() => handleToggleFavorite(coin.address)}
                    color={favorites.includes(coin.address) ? 'primary' : 'default'}
                  >
                    <PlaceholderImage width={20} height={20} text="Star" />
                    <StarIcon />
                  </IconButton>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {coin.symbol}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingIcon 
                    sx={{ 
                      color: coin.priceChange24h >= 0 ? '#4caf50' : '#f44336',
                      mr: 1,
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: coin.priceChange24h >= 0 ? '#4caf50' : '#f44336',
                    }}
                  >
                    {coin.priceChange24h >= 0 ? '+' : ''}{coin.priceChange24h}%
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="body1">
                    ${coin.price.toFixed(6)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Volume 24h
                  </Typography>
                  <Typography variant="body1">
                    ${coin.volume24h.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Liquidity
                  </Typography>
                  <Typography variant="body1">
                    ${coin.liquidity.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Holders
                  </Typography>
                  <Typography variant="body1">
                    {coin.holders.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleSnipe(coin)}
                    disabled={!account}
                  >
                    Snipe Now
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CoinTracker;
