import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  useTheme,
  InputAdornment,
  Button,
} from '@mui/material';
import { Search as SearchIcon, Star as StarIcon, TrendingUp as TrendingIcon } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';
import { Coin } from '../types/Coin';
import { HyperEVMService } from '../services/hyperevm';

const hyperEVMService = new HyperEVMService();

const CoinTracker: React.FC = () => {
  const { account } = useWeb3React();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchNewCoins = async () => {
      try {
        const newCoins = await hyperEVMService.scanForNewCoins();
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
  }, []);

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

  const filteredCoins = coins.filter((coin: Coin) => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        Token Tracker
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search tokens..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.dark,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.dark,
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredCoins.map((coin: Coin) => (
              <Grid item xs={12} sm={6} md={4} key={coin.address}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Token Info Header */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {coin.name} ({coin.symbol})
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                        ${coin.price.toLocaleString()} HYPE
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingIcon sx={{ color: coin.priceChange24h > 0 ? 'success.main' : 'error.main', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: coin.priceChange24h > 0 ? 'success.main' : 'error.main' }}>
                          {coin.priceChange24h.toFixed(2)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Market Info */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Market Cap: ${coin.marketCap.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Volume 24h: ${coin.volume24h.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Liquidity: ${coin.liquidity.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Bonding Info */}
                  {coin.isBonding && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="primary">
                        Bonding Progress
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <Box sx={{
                            height: 8,
                            borderRadius: 2,
                            backgroundColor: 'grey.200',
                            position: 'relative',
                          }}>
                            <Box sx={{
                              height: '100%',
                              borderRadius: 2,
                              backgroundColor: 'primary.main',
                              width: `${coin.bondingProgress}%`,
                            }} />
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {coin.bondingProgress.toFixed(2)}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Bonding Price: ${coin.bondingPrice} HYPE
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        APY: {coin.bondingAPY.toFixed(2)}%
                      </Typography>
                    </Box>
                  )}

                  {/* Token Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <IconButton onClick={() => handleToggleFavorite(coin.address)}>
                      <StarIcon sx={{ color: favorites.includes(coin.address) ? 'warning.main' : 'inherit' }} />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSnipe(coin)}
                      disabled={!account}
                    >
                      Buy ${coin.symbol}
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleSnipe(coin)}
                      disabled={!account}
                    >
                      {coin.buyTax > 0 ? `Buy Tax: ${coin.buyTax}%` : 'No Buy Tax'}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CoinTracker;
