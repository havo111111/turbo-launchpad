import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  CircularProgress 
} from '@mui/material';
import { HyperEVMService } from '../services/hyperevm';
import { Coin } from '../types/Coin';

export const TokenList: React.FC = () => {
  const { library } = useWeb3React();
  const [tokens, setTokens] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTokens = async () => {
      if (!library) return;

      try {
        const hyperEVMService = new HyperEVMService();
        const newTokens = await hyperEVMService.scanForNewCoins();
        setTokens(newTokens);
        setError('');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 30000);
    return () => clearInterval(interval);
  }, [library]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Tokens
      </Typography>

      <Grid container spacing={3}>
        {tokens.map((token) => (
          <Grid item xs={12} sm={6} md={4} key={token.address}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {token.name} ({token.symbol})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Market Cap: ${Number(token.marketCap).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Supply: {Number(token.totalSupply).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bonding Progress: {Number(token.bondingProgress).toFixed(2)}%
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  href={`/token/${token.address}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
