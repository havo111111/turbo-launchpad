import { ethers } from 'ethers';
import { CHAIN_ID, GAS_CONFIG } from '../config/constants';

export class Web3Service {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
  }

  async getAccount(): Promise<string> {
    return this.signer.getAddress();
  }

  async getBalance(address: string): Promise<ethers.BigNumber> {
    return this.provider.getBalance(address);
  }

  async sendTransaction(
    to: string,
    value: ethers.BigNumber,
    data: string,
    gasLimit: number = GAS_CONFIG.defaultGasLimit
  ): Promise<ethers.providers.TransactionResponse> {
    const tx = {
      to,
      value,
      data,
      gasLimit,
      maxPriorityFeePerGas: GAS_CONFIG.maxPriorityFeePerGas,
      maxFeePerGas: GAS_CONFIG.maxFeePerGas,
    };

    return this.signer.sendTransaction(tx);
  }

  async getGasPrice(): Promise<ethers.BigNumber> {
    return this.provider.getGasPrice();
  }

  async estimateGas(transaction: ethers.providers.TransactionRequest): Promise<ethers.BigNumber> {
    return this.provider.estimateGas(transaction);
  }
}
