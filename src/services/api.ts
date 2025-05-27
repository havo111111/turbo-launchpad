import { ethers } from 'ethers';
import { Coin } from '../types/Coin';

const HYPEREVM_RPC_URL = 'https://rpc.hyperliquid.xyz/evm';
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];

const provider = new ethers.providers.JsonRpcProvider(HYPEREVM_RPC_URL);

export const getNewCoins = async (): Promise<Coin[]> => {
  try {
    // Get the latest block number
    const latestBlock = await provider.getBlockNumber();
    
    // Scan the last 100 blocks for new token deployments
    const newCoins: Coin[] = [];
    
    for (let i = latestBlock - 100; i <= latestBlock; i++) {
      const block = await provider.getBlockWithTransactions(i);
      
      if (!block) continue;
      
      for (const tx of block.transactions) {
        // Check for ERC20 token deployments
        if (tx.to === null) { // Contract deployment
          try {
            // Get the contract address from the receipt
            const receipt = await provider.getTransactionReceipt(tx.hash);
            if (!receipt || !receipt.contractAddress) continue;
            
            // Create a contract instance to get token info
            const tokenContract = new ethers.Contract(
              receipt.contractAddress,
              ERC20_ABI,
              provider
            );
            
            const [name, symbol, totalSupply, decimals] = await Promise.all([
              tokenContract.name(),
              tokenContract.symbol(),
              tokenContract.totalSupply(),
              tokenContract.decimals(),
            ]);
            
            // Get token holders count
            const holders = await provider.getStorageAt(
              receipt.contractAddress,
              '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc' // ERC20 holders count storage slot
            );
            
            newCoins.push({
              address: receipt.contractAddress,
              name: name as string,
              symbol: symbol as string,
              totalSupply: totalSupply.toString(),
              timestamp: block.timestamp * 1000,
              price: 0,
              priceChange24h: 0,
              volume24h: 0,
              liquidity: 0,
              holders: parseInt(holders, 16),
              verified: false,
              favorite: false,
              marketCap: 0,
              bondingProgress: 0,
              bondingPrice: 0,
              bondingAPY: 0,
              buyTax: 0,
              sellTax: 0,
              isBonding: false,
              bondingPool: ''
            });
          } catch (error) {
            console.error('Error processing token:', error);
          }
        }
      }
    }

    // Update token metrics (volume, price, liquidity)
    await Promise.all(
      newCoins.map(async (coin) => {
        try {
          // Get token transfers in the last 24 hours
          const events = await provider.getLogs({
            address: coin.address,
            fromBlock: latestBlock - 1000, // Last 1000 blocks
            topics: [
              '0xddf252ad1be2c89b69c2b068fc378daa952ba7f46f583b8b0b877878bbce744', // Transfer event
            ],
          });

          // Calculate volume
          const volume = events.reduce((sum, event) => {
            const value = ethers.BigNumber.from(event.data);
            return sum.add(value);
          }, ethers.BigNumber.from(0));

          coin.volume24h = parseFloat(ethers.utils.formatUnits(volume, 18));

          // Get token price (using DEX data)
          // TODO: Implement DEX price fetching
          coin.price = Math.random() * 0.1; // Random price for now
          coin.priceChange24h = (Math.random() - 0.5) * 10; // Random price change

          // Calculate liquidity
          // TODO: Implement liquidity calculation
          coin.liquidity = coin.volume24h * coin.price;
        } catch (error) {
          console.error('Error updating token metrics:', error);
        }
      })
    );

    return newCoins;
  } catch (error) {
    console.error('Error fetching new coins:', error);
    throw error;
  }
};
