export interface Coin {
    address: string;
    name: string;
    symbol: string;
    totalSupply: string;
    timestamp: number;
    price: number;
    priceChange24h: number;
    volume24h: number;
    liquidity: number;
    holders: number;
    verified: boolean;
    favorite: boolean;
    marketCap: number;
    bondingProgress: number;
    bondingPrice: number;
    bondingAPY: number;
    buyTax: number;
    sellTax: number;
    isBonding: boolean;
    bondingPool: string;
}
