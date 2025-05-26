import { ethers } from 'ethers';
import { Coin } from '../types/Coin';
import { config } from '../config';

interface NewCoinEvent {
  address: string;
  name: string;
  symbol: string;
  timestamp: number;
}

export class HyperEVMService {
  private provider: ethers.providers.JsonRpcProvider;
  private latestBlockNumber: number = 0;
  private verifiedContracts: Set<string> = new Set();
  private readonly HYPE_TOKEN = '0x0d01dc56dcaaca66ad901c959b4011ec';
  private readonly VERIFICATION_CONTRACT = '0x0d01dc56dcaaca66ad901c959b4011ec'; // HYPE token contract address

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  }

  async getLatestBlockNumber(): Promise<number> {
    const blockNumber = await this.provider.getBlockNumber();
    this.latestBlockNumber = blockNumber;
    return blockNumber;
  }

  async verifyContract(address: string): Promise<boolean> {
    try {
      const verificationContract = new ethers.Contract(
        this.VERIFICATION_CONTRACT,
        ['function isVerified(address) view returns (bool)'],
        this.provider
      );
      
      const isVerified = await verificationContract.isVerified(address);
      return isVerified;
    } catch (error) {
      console.error('Error verifying contract:', error);
      return false;
    }
  }

  async getHYPEBalance(address: string): Promise<string> {
    try {
      const hypeToken = new ethers.Contract(this.HYPE_TOKEN, [
        'function balanceOf(address) view returns (uint256)',
        'function decimals() view returns (uint8)'
      ], this.provider);

      const [balance, decimals] = await Promise.all([
        hypeToken.balanceOf(address),
        hypeToken.decimals()
      ]);

      return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error fetching HYPE balance:', error);
      return '0';
    }
  }

  async scanForNewCoins(): Promise<Coin[]> {
    const newCoins: Coin[] = [];
    
    // Get the latest block number
    const latestBlock = await this.getLatestBlockNumber();
    
    // Scan through recent blocks (last 100 blocks)
    for (let i = Math.max(0, latestBlock - 100); i <= latestBlock; i++) {
      try {
        const block = await this.provider.getBlockWithTransactions(i);
        
        // Check each transaction for new token deployments
        for (const tx of block.transactions) {
          if (tx.to === null) { // New contract deployment
            const receipt = await this.provider.getTransactionReceipt(tx.hash);
            if (receipt && receipt.contractAddress) {
              const address = receipt.contractAddress;
              try {
                // Get token details
                const token = new ethers.Contract(address, [
                  'function name() view returns (string)',
                  'function symbol() view returns (string)',
                  'function totalSupply() view returns (uint256)',
                  'function decimals() view returns (uint8)',
                  'function balanceOf(address) view returns (uint256)',
                ], this.provider);

                const [name, symbol, totalSupply, decimals] = await Promise.all([
                  token.name(),
                  token.symbol(),
                  token.totalSupply(),
                  token.decimals(),
                ]);

                // Check if contract is verified
                const isVerified = await this.verifyContract(address);

                // Get HYPE liquidity
                const hypeBalance = await this.getHYPEBalance(address);

                newCoins.push({
                  address,
                  name,
                  symbol,
                  totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
                  timestamp: block.timestamp,
                  price: 0,
                  priceChange24h: 0,
                  volume24h: 0,
                  liquidity: parseFloat(hypeBalance),
                  holders: 0,
                  verified: isVerified,
                  favorite: false
                });

                // Cache verified contracts
                if (isVerified) {
                  this.verifiedContracts.add(address);
                }
              } catch (error) {
                console.error('Error fetching token details:', error);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing block:', error);
      }
    }

    return newCoins;
  }

  async getNewCoins(): Promise<Coin[]> {
    try {
      const coins = await this.scanForNewCoins();
      return coins;
    } catch (error) {
      console.error('Error fetching new coins:', error);
      throw error;
    }
  }

  async getCoinDetails(address: string): Promise<Coin | null> {
    try {
      const token = new ethers.Contract(address, [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function totalSupply() view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address) view returns (uint256)',
      ], this.provider);

      const [name, symbol, totalSupply, decimals] = await Promise.all([
        token.name(),
        token.symbol(),
        token.totalSupply(),
        token.decimals(),
      ]);

      const verified = await this.verifyContract(address);
      
      // Get HYPE liquidity
      const hypeBalance = await this.getHYPEBalance(address);
      
      return {
        address,
        name,
        symbol,
        totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
        timestamp: Math.floor(Date.now() / 1000),
        price: 0,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: parseFloat(hypeBalance),
        holders: 0,
        verified,
        favorite: false
      };
    } catch (error) {
      console.error('Error fetching coin details:', error);
      return null;
    }
  }
}
