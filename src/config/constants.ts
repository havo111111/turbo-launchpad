export const CHAIN_ID = 56; // BSC Mainnet
export const CONTRACT_ADDRESS = ""; // Will be filled with actual contract address

export const GAS_CONFIG = {
  defaultGasLimit: 21000,
  maxPriorityFeePerGas: 1000000000, // 1 Gwei
  maxFeePerGas: 2000000000, // 2 Gwei
};

export const DEFAULT_SLIPPAGE = 1; // 1%
export const DEFAULT_DEADLINE = 30; // 30 minutes

export const REWARDS_CONFIG = {
  volumeMultiplier: 1.5,
  feeMultiplier: 2.0,
  basePoints: 100,
};
