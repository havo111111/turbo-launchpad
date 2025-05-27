var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ethers } from 'ethers';
var HYPEREVM_RPC_URL = 'https://rpc.hyperliquid.xyz/evm';
var ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
];
var provider = new ethers.providers.JsonRpcProvider(HYPEREVM_RPC_URL);
export var getNewCoins = function () { return __awaiter(void 0, void 0, void 0, function () {
    var latestBlock_1, newCoins, i, block, _i, _a, tx, receipt, tokenContract, _b, name_1, symbol, totalSupply, decimals, holders, error_1, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 14, , 15]);
                return [4 /*yield*/, provider.getBlockNumber()];
            case 1:
                latestBlock_1 = _c.sent();
                newCoins = [];
                i = latestBlock_1 - 100;
                _c.label = 2;
            case 2:
                if (!(i <= latestBlock_1)) return [3 /*break*/, 12];
                return [4 /*yield*/, provider.getBlockWithTransactions(i)];
            case 3:
                block = _c.sent();
                if (!block)
                    return [3 /*break*/, 11];
                _i = 0, _a = block.transactions;
                _c.label = 4;
            case 4:
                if (!(_i < _a.length)) return [3 /*break*/, 11];
                tx = _a[_i];
                if (!(tx.to === null)) return [3 /*break*/, 10];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 9, , 10]);
                return [4 /*yield*/, provider.getTransactionReceipt(tx.hash)];
            case 6:
                receipt = _c.sent();
                if (!receipt || !receipt.contractAddress)
                    return [3 /*break*/, 10];
                tokenContract = new ethers.Contract(receipt.contractAddress, ERC20_ABI, provider);
                return [4 /*yield*/, Promise.all([
                        tokenContract.name(),
                        tokenContract.symbol(),
                        tokenContract.totalSupply(),
                        tokenContract.decimals(),
                    ])];
            case 7:
                _b = _c.sent(), name_1 = _b[0], symbol = _b[1], totalSupply = _b[2], decimals = _b[3];
                return [4 /*yield*/, provider.getStorageAt(receipt.contractAddress, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc' // ERC20 holders count storage slot
                    )];
            case 8:
                holders = _c.sent();
                newCoins.push({
                    address: receipt.contractAddress,
                    name: name_1,
                    symbol: symbol,
                    totalSupply: totalSupply.toString(),
                    timestamp: block.timestamp * 1000,
                    price: 0,
                    priceChange24h: 0,
                    volume24h: 0,
                    liquidity: 0,
                    holders: parseInt(holders, 16),
                    verified: false,
                    favorite: false,
                    marketCap: 0,
                    bondingProgress: 0,
                    bondingPrice: 0,
                    bondingAPY: 0,
                    buyTax: 0,
                    sellTax: 0,
                    isBonding: false,
                    bondingPool: ''
                });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _c.sent();
                console.error('Error processing token:', error_1);
                return [3 /*break*/, 10];
            case 10:
                _i++;
                return [3 /*break*/, 4];
            case 11:
                i++;
                return [3 /*break*/, 2];
            case 12: 
            // Update token metrics (volume, price, liquidity)
            return [4 /*yield*/, Promise.all(newCoins.map(function (coin) { return __awaiter(void 0, void 0, void 0, function () {
                    var events, volume, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, provider.getLogs({
                                        address: coin.address,
                                        fromBlock: latestBlock_1 - 1000,
                                        topics: [
                                            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f46f583b8b0b877878bbce744', // Transfer event
                                        ],
                                    })];
                            case 1:
                                events = _a.sent();
                                volume = events.reduce(function (sum, event) {
                                    var value = ethers.BigNumber.from(event.data);
                                    return sum.add(value);
                                }, ethers.BigNumber.from(0));
                                coin.volume24h = parseFloat(ethers.utils.formatUnits(volume, 18));
                                // Get token price (using DEX data)
                                // TODO: Implement DEX price fetching
                                coin.price = Math.random() * 0.1; // Random price for now
                                coin.priceChange24h = (Math.random() - 0.5) * 10; // Random price change
                                // Calculate liquidity
                                // TODO: Implement liquidity calculation
                                coin.liquidity = coin.volume24h * coin.price;
                                return [3 /*break*/, 3];
                            case 2:
                                error_3 = _a.sent();
                                console.error('Error updating token metrics:', error_3);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }))];
            case 13:
                // Update token metrics (volume, price, liquidity)
                _c.sent();
                return [2 /*return*/, newCoins];
            case 14:
                error_2 = _c.sent();
                console.error('Error fetching new coins:', error_2);
                throw error_2;
            case 15: return [2 /*return*/];
        }
    });
}); };
