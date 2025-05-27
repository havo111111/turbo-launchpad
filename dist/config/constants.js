export var CHAIN_ID = 56; // BSC Mainnet
export var CONTRACT_ADDRESS = ""; // Will be filled with actual contract address
export var GAS_CONFIG = {
    defaultGasLimit: 21000,
    maxPriorityFeePerGas: 1000000000,
    maxFeePerGas: 2000000000, // 2 Gwei
};
export var DEFAULT_SLIPPAGE = 1; // 1%
export var DEFAULT_DEADLINE = 30; // 30 minutes
export var REWARDS_CONFIG = {
    volumeMultiplier: 1.5,
    feeMultiplier: 2.0,
    basePoints: 100,
};
