import { ethers } from 'ethers';
export declare class Web3Service {
    private provider;
    private signer;
    constructor(provider: ethers.providers.Web3Provider);
    getAccount(): Promise<string>;
    getBalance(address: string): Promise<ethers.BigNumber>;
    sendTransaction(to: string, value: ethers.BigNumber, data: string, gasLimit?: number): Promise<ethers.providers.TransactionResponse>;
    getGasPrice(): Promise<ethers.BigNumber>;
    estimateGas(transaction: ethers.providers.TransactionRequest): Promise<ethers.BigNumber>;
}
