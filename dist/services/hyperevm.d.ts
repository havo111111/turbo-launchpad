import { Coin } from '../types';
import { config } from '../config';
export { config };
export declare class HyperEVMService {
    private provider;
    private contract;
    private latestBlockNumber;
    private verifiedContracts;
    private readonly HYPE_TOKEN;
    private readonly CONTRACT_ADDRESS;
    private readonly VERIFICATION_CONTRACT;
    constructor();
    getCoinDetails(tokenAddress: string): Promise<Coin>;
    getLatestBlockNumber(): Promise<number>;
    createToken(name: string, symbol: string): Promise<string>;
    verifyContract(tokenAddress: string): Promise<boolean>;
    getHYPEBalance(tokenAddress: string): Promise<string>;
    scanForNewCoins(): Promise<Coin[]>;
}
