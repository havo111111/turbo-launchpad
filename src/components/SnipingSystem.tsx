import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Web3Service } from '../services/web3Service';
import { GAS_CONFIG, DEFAULT_SLIPPAGE } from '../config/constants';
import { ethers } from 'ethers';

interface SnipeSettings {
  gasLimit: number;
  slippage: number;
  tokenAddress: string;
  amount: string;
}

const SnipingSystem: React.FC = () => {
  const { account, library } = useWeb3React();
  const web3Service = new Web3Service(library);
  const [settings, setSettings] = useState<SnipeSettings>({
    gasLimit: GAS_CONFIG.defaultGasLimit,
    slippage: DEFAULT_SLIPPAGE,
    tokenAddress: '',
    amount: '0',
  });
  const [loading, setLoading] = useState(false);
  const [gasPrice, setGasPrice] = useState('');

  useEffect(() => {
    const updateGasPrice = async () => {
      try {
        const price = await web3Service.getGasPrice();
        setGasPrice(ethers.utils.formatUnits(price, 'gwei'));
      } catch (error) {
        console.error('Error fetching gas price:', error);
        setGasPrice('N/A');
      }
    };

    updateGasPrice();
    const interval = setInterval(updateGasPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [library]);

  const handleSnipe = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!settings.tokenAddress || !settings.amount) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Convert amount to wei
      const amountWei = ethers.utils.parseEther(settings.amount);
      
      // Create transaction
      const tx = {
        to: settings.tokenAddress,
        value: amountWei,
        gasLimit: settings.gasLimit,
        maxPriorityFeePerGas: GAS_CONFIG.maxPriorityFeePerGas,
        maxFeePerGas: GAS_CONFIG.maxFeePerGas,
      };

      // Send transaction
      const txResponse = await web3Service.sendTransaction(
        settings.tokenAddress,
        amountWei,
        '0x', // Data field for token transfer
        settings.gasLimit
      );

      // Wait for transaction confirmation
      await txResponse.wait();
      
      alert('Snipe successful!');
    } catch (error) {
      console.error('Snipe failed:', error);
      alert('Snipe failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sniping System
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Settings
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Token Address</InputLabel>
            <Select
              value={settings.tokenAddress}
              onChange={(e) => setSettings({ ...settings, tokenAddress: e.target.value })}
              label="Token Address"
            >
              {/* This would be populated from a list of tracked tokens */}
              <MenuItem value="">Select a token</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Amount (BNB)"
            type="number"
            value={settings.amount}
            onChange={(e) => setSettings({ ...settings, amount: e.target.value })}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ width: '50%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Gas Limit
            </Typography>
            <Slider
              value={settings.gasLimit}
              onChange={(e, value) => setSettings({ ...settings, gasLimit: value as number })}
              min={21000}
              max={1000000}
              step={1000}
              valueLabelDisplay="auto"
            />
          </Box>
          
          <Box sx={{ width: '50%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Slippage
            </Typography>
            <Slider
              value={settings.slippage}
              onChange={(e, value) => setSettings({ ...settings, slippage: value as number })}
              min={0.1}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Current Gas Price: {gasPrice} Gwei
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSnipe}
          disabled={loading || !account}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Snipe Now'}
        </Button>
      </Paper>
    </Box>
  );
};

export default SnipingSystem;
