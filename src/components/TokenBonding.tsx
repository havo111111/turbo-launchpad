import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Button, Box, Typography, CircularProgress, LinearProgress } from '@mui/material';
import { HyperEVMService } from '../services/hyperevm';

interface TokenBondingProps {
  tokenAddress: string;
}

export const TokenBonding: React.FC<TokenBondingProps> = ({ tokenAddress }) => {
  const { account, library } = useWeb3React();
  const [bondingProgress, setBondingProgress] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBondingData = async () => {
      if (!library) return;

      try {
        const provider = new ethers.providers.Web3Provider(library);
        const hyperEVMService = new HyperEVMService();
        
        // Get token details
        const token = await hyperEVMService.getCoinDetails(tokenAddress);
        if (!token) throw new Error('Token not found');

        // Calculate bonding progress
        const targetSupply = 710200000; // 710.2M tokens
        const currentSupply = parseFloat(token.totalSupply);
        setBondingProgress((currentSupply / targetSupply) * 100);

        // Get current price
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ['function price() view returns (uint256)'],
          provider
        );
        const price = await tokenContract.price();
        setPrice(Number(ethers.utils.formatEther(price)));
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchBondingData();
    const interval = setInterval(fetchBondingData, 30000);
    return () => clearInterval(interval);
  }, [library, tokenAddress]);

  const handleBuyTokens = async () => {
    if (!account || !library) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const provider = new ethers.providers.Web3Provider(library);
      const signer = provider.getSigner();
      
      const bondingContract = new ethers.Contract(
        tokenAddress,
        ['function buyTokens(uint256 amount) external payable'],
        signer
      );

      const amount = ethers.utils.parseEther('1'); // Example: Buy 1 HYPE worth of tokens
      const tx = await bondingContract.buyTokens(amount, { value: amount });
      await tx.wait();

      setSuccess(true);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Token Bonding Progress
      </Typography>

      <LinearProgress
        variant="determinate"
        value={bondingProgress}
        sx={{ mb: 2 }}
      />

      <Typography variant="body1" sx={{ mb: 2 }}>
        Current Progress: {bondingProgress.toFixed(2)}%
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Current Price: {price.toFixed(6)} HYPE
      </Typography>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Transaction successful!
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleBuyTokens}
        disabled={loading || bondingProgress >= 100}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Buy Tokens'}
      </Button>
    </Box>
  );
};
