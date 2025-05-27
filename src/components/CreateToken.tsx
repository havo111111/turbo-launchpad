import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { HyperEVMService, config } from '../services/hyperevm';

export const CreateToken: React.FC = () => {
  const { account, library } = useWeb3React();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateToken = async () => {
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
      const hyperEVMService = new HyperEVMService();

      // Check if user has enough HYPE
      const hypeContract = new ethers.Contract(
        config.contractAddresses.hypeToken,
        ['function balanceOf(address) view returns (uint256)'],
        provider
      );

      const hypeBalance = await hypeContract.balanceOf(account);
      if (hypeBalance.lt(ethers.utils.parseEther('1'))) {
        throw new Error('Insufficient HYPE balance. Minimum 1 HYPE required.');
      }

      // Create token contract
      const tokenFactory = new ethers.Contract(
        config.contractAddresses.main,
        [
          'function createToken(string memory name, string memory symbol) external returns (address)'
        ],
        signer
      );

      const tx = await tokenFactory.createToken(name, symbol);
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
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Token
      </Typography>
      
      <TextField
        fullWidth
        label="Token Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Token Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        margin="normal"
        required
      />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Token created successfully!
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateToken}
        disabled={loading || !name || !symbol}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Token'}
      </Button>
    </Box>
  );
};
