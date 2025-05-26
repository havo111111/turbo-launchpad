export const config = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.hyperliquid.xyz/evm',
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.turbo-launchpad.com',
  theme: {
    primaryColor: '#2196f3',
    secondaryColor: '#1976d2',
    backgroundColor: '#f5f5f5',
    textColor: '#333333'
  }
};
