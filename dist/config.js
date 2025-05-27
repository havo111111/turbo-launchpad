export var config = {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.hyperliquid.xyz/evm',
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.turbo-launchpad.com',
    theme: {
        primaryColor: '#2196f3',
        secondaryColor: '#1976d2',
        backgroundColor: '#f5f5f5',
        textColor: '#333333'
    },
    contractAddresses: {
        main: '0xdec3540f5ba6f2aa3764583a9c29501feb020030',
        hypeToken: '0x0d01dc56dcaaca66ad901c959b4011ec',
        verification: '0x0d01dc56dcaaca66ad901c959b4011ec'
    }
};
