import { ethers } from 'ethers';
import { Coin } from '../types';
import { config, Config, ContractAddresses } from '../config';

export { config };

interface ContractFunctions {
  isVerified: (address: string) => Promise<boolean>;
  getHYPEBalance: (address: string) => Promise<string>;
  getTokenPrice: (address: string) => Promise<string>;
  getBondingProgress: (address: string) => Promise<string>;
  getBondingAPY: (address: string) => Promise<string>;
  getBuyTax: (address: string) => Promise<string>;
  getSellTax: (address: string) => Promise<string>;
  getBondingPool: (address: string) => Promise<string>;
  isBonding: (address: string) => Promise<boolean>;
}

interface NewCoinEvent {
  address: string;
  name: string;
  symbol: string;
  timestamp: number;
}

export class HyperEVMService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract & ContractFunctions;
  private latestBlockNumber: number = 0;
  private verifiedContracts: Set<string> = new Set();
  private readonly HYPE_TOKEN: string;
  private readonly CONTRACT_ADDRESS: string;
  private readonly VERIFICATION_CONTRACT: string;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
    this.contract = new ethers.Contract(
      config.contractAddresses.main,
      [
        'event TokenCreated(address indexed token, string name, string symbol)',
        'event Transfer(address indexed from, address indexed to, uint256 value)',
        'event Approval(address indexed owner, address indexed spender, uint256 value)',
        'function createToken(string memory name, string memory symbol) external returns (address)',
        'function getCoinDetails(address token) view returns (string name, string symbol, uint256 totalSupply, uint8 decimals)',
        'function isVerified(address token) view returns (bool)',
        'function getHYPEBalance(address token) view returns (uint256)',
        'function getTokenPrice(address token) view returns (uint256)',
        'function getBondingProgress(address token) view returns (uint256)',
        'function getBondingAPY(address token) view returns (uint256)',
        'function getBuyTax(address token) view returns (uint256)',
        'function getSellTax(address token) view returns (uint256)',
        'function isBonding(address token) view returns (bool)',
        'function getBondingPool(address token) view returns (address)'
      ],
      this.provider
    ) as ethers.Contract & ContractFunctions;

    this.HYPE_TOKEN = config.contractAddresses.hypeToken;
    this.CONTRACT_ADDRESS = config.contractAddresses.main;
    this.VERIFICATION_CONTRACT = config.contractAddresses.verification;
  }

  async getCoinDetails(tokenAddress: string): Promise<Coin> {
    try {
      const [name, symbol, totalSupply, decimals] = await this.contract.getCoinDetails(tokenAddress);
      const price = await this.contract.getTokenPrice(tokenAddress);
      const progress = await this.contract.getBondingProgress(tokenAddress);
      const apy = await this.contract.getBondingAPY(tokenAddress);
      const buyTax = await this.contract.getBuyTax(tokenAddress);
      const sellTax = await this.contract.getSellTax(tokenAddress);
      const pool = await this.contract.getBondingPool(tokenAddress);
      const isBonding = await this.contract.isBonding(tokenAddress);
      const verified = await this.contract.isVerified(tokenAddress);

      // Format all numeric values
      const formattedPrice = Number(ethers.utils.formatEther(price));
      const formattedTotalSupply = Number(ethers.utils.formatUnits(totalSupply, decimals));
      const formattedProgress = Number(ethers.utils.formatEther(progress)) * 100;
      const formattedBuyTax = Number(ethers.utils.formatEther(buyTax)) * 100;
      const formattedSellTax = Number(ethers.utils.formatEther(sellTax)) * 100;
      const formattedAPY = Number(ethers.utils.formatEther(apy)) * 100;

      return {
        address: tokenAddress,
        name: name as string,
        symbol: symbol as string,
        totalSupply: formattedTotalSupply.toString(),
        timestamp: await this.getLatestBlockNumber(),
        price: formattedPrice,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: 0,
        holders: 0,
        verified,
        favorite: false,
        marketCap: formattedPrice * formattedTotalSupply,
        bondingProgress: formattedProgress,
        bondingPrice: formattedPrice,
        bondingAPY: formattedAPY,
        buyTax: formattedBuyTax,
        sellTax: formattedSellTax,
        isBonding,
        bondingPool: pool as string
      };
    } catch (error) {
      console.error('Error getting coin details:', error);
      throw error;
    }
  }
  async getLatestBlockNumber(): Promise<number> {
    const blockNumber = await this.provider.getBlockNumber();
    this.latestBlockNumber = blockNumber;
    return blockNumber;
  }

  async createToken(name: string, symbol: string): Promise<string> {
    try {
      const tx = await this.contract.createToken(name, symbol);
      await tx.wait();
      return tx.events?.[0]?.args?.token as string;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  }

  async verifyContract(tokenAddress: string): Promise<boolean> {
    try {
      const isVerified = await this.contract.isVerified(tokenAddress);
      return isVerified;
    } catch (error) {
      console.error('Error verifying contract:', error);
      return false;
    }
  }

  async getHYPEBalance(tokenAddress: string): Promise<string> {
    try {
      const balance = await this.contract.getHYPEBalance(tokenAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting HYPE balance:', error);
      return '0';
    }
  }

  async scanForNewCoins(): Promise<Coin[]> {
    try {
      const filter = this.contract.filters.TokenCreated();
      const events = await this.provider.getLogs({
        address: this.CONTRACT_ADDRESS,
        fromBlock: await this.getLatestBlockNumber() - 100,
        toBlock: await this.getLatestBlockNumber()
      });

      const coins: Coin[] = [];
      for (const event of events) {
        try {
          const parsedEvent = this.contract.interface.parseLog(event);
          const { token } = parsedEvent.args;
          const coin = await this.getCoinDetails(token);
          coins.push(coin);
        } catch (error) {
          console.error('Error processing token event:', error);
        }
      }

      return coins;
    } catch (error) {
      console.error('Error scanning for new coins:', error);
      return [];
    }
  }




}
