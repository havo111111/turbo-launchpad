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
import { config } from '../config';
export { config };
var HyperEVMService = /** @class */ (function () {
    function HyperEVMService() {
        this.latestBlockNumber = 0;
        this.verifiedContracts = new Set();
        this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
        this.contract = new ethers.Contract(config.contractAddresses.main, [
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
        ], this.provider);
        this.HYPE_TOKEN = config.contractAddresses.hypeToken;
        this.CONTRACT_ADDRESS = config.contractAddresses.main;
        this.VERIFICATION_CONTRACT = config.contractAddresses.verification;
    }
    HyperEVMService.prototype.getCoinDetails = function (tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, symbol, totalSupply, decimals, price, progress, apy, buyTax, sellTax, pool, isBonding, verified, formattedPrice, formattedTotalSupply, formattedProgress, formattedBuyTax, formattedSellTax, formattedAPY, error_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.contract.getCoinDetails(tokenAddress)];
                    case 1:
                        _a = _c.sent(), name_1 = _a[0], symbol = _a[1], totalSupply = _a[2], decimals = _a[3];
                        return [4 /*yield*/, this.contract.getTokenPrice(tokenAddress)];
                    case 2:
                        price = _c.sent();
                        return [4 /*yield*/, this.contract.getBondingProgress(tokenAddress)];
                    case 3:
                        progress = _c.sent();
                        return [4 /*yield*/, this.contract.getBondingAPY(tokenAddress)];
                    case 4:
                        apy = _c.sent();
                        return [4 /*yield*/, this.contract.getBuyTax(tokenAddress)];
                    case 5:
                        buyTax = _c.sent();
                        return [4 /*yield*/, this.contract.getSellTax(tokenAddress)];
                    case 6:
                        sellTax = _c.sent();
                        return [4 /*yield*/, this.contract.getBondingPool(tokenAddress)];
                    case 7:
                        pool = _c.sent();
                        return [4 /*yield*/, this.contract.isBonding(tokenAddress)];
                    case 8:
                        isBonding = _c.sent();
                        return [4 /*yield*/, this.contract.isVerified(tokenAddress)];
                    case 9:
                        verified = _c.sent();
                        formattedPrice = Number(ethers.utils.formatEther(price));
                        formattedTotalSupply = Number(ethers.utils.formatUnits(totalSupply, decimals));
                        formattedProgress = Number(ethers.utils.formatEther(progress)) * 100;
                        formattedBuyTax = Number(ethers.utils.formatEther(buyTax)) * 100;
                        formattedSellTax = Number(ethers.utils.formatEther(sellTax)) * 100;
                        formattedAPY = Number(ethers.utils.formatEther(apy)) * 100;
                        _b = {
                            address: tokenAddress,
                            name: name_1,
                            symbol: symbol,
                            totalSupply: formattedTotalSupply.toString()
                        };
                        return [4 /*yield*/, this.getLatestBlockNumber()];
                    case 10: return [2 /*return*/, (_b.timestamp = _c.sent(),
                            _b.price = formattedPrice,
                            _b.priceChange24h = 0,
                            _b.volume24h = 0,
                            _b.liquidity = 0,
                            _b.holders = 0,
                            _b.verified = verified,
                            _b.favorite = false,
                            _b.marketCap = formattedPrice * formattedTotalSupply,
                            _b.bondingProgress = formattedProgress,
                            _b.bondingPrice = formattedPrice,
                            _b.bondingAPY = formattedAPY,
                            _b.buyTax = formattedBuyTax,
                            _b.sellTax = formattedSellTax,
                            _b.isBonding = isBonding,
                            _b.bondingPool = pool,
                            _b)];
                    case 11:
                        error_1 = _c.sent();
                        console.error('Error getting coin details:', error_1);
                        throw error_1;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    HyperEVMService.prototype.getLatestBlockNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.getBlockNumber()];
                    case 1:
                        blockNumber = _a.sent();
                        this.latestBlockNumber = blockNumber;
                        return [2 /*return*/, blockNumber];
                }
            });
        });
    };
    HyperEVMService.prototype.createToken = function (name, symbol) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var tx, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.contract.createToken(name, symbol)];
                    case 1:
                        tx = _d.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, (_c = (_b = (_a = tx.events) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.args) === null || _c === void 0 ? void 0 : _c.token];
                    case 3:
                        error_2 = _d.sent();
                        console.error('Error creating token:', error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HyperEVMService.prototype.verifyContract = function (tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var isVerified, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.isVerified(tokenAddress)];
                    case 1:
                        isVerified = _a.sent();
                        return [2 /*return*/, isVerified];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error verifying contract:', error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HyperEVMService.prototype.getHYPEBalance = function (tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.contract.getHYPEBalance(tokenAddress)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, ethers.utils.formatEther(balance)];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error getting HYPE balance:', error_4);
                        return [2 /*return*/, '0'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HyperEVMService.prototype.scanForNewCoins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filter, events, _a, _b, coins, _i, events_1, event_1, parsedEvent, token, coin, error_5, error_6;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 10, , 11]);
                        filter = this.contract.filters.TokenCreated();
                        _b = (_a = this.provider).getLogs;
                        _c = {
                            address: this.CONTRACT_ADDRESS
                        };
                        return [4 /*yield*/, this.getLatestBlockNumber()];
                    case 1:
                        _c.fromBlock = (_d.sent()) - 100;
                        return [4 /*yield*/, this.getLatestBlockNumber()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.toBlock = _d.sent(),
                                _c)])];
                    case 3:
                        events = _d.sent();
                        coins = [];
                        _i = 0, events_1 = events;
                        _d.label = 4;
                    case 4:
                        if (!(_i < events_1.length)) return [3 /*break*/, 9];
                        event_1 = events_1[_i];
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        parsedEvent = this.contract.interface.parseLog(event_1);
                        token = parsedEvent.args.token;
                        return [4 /*yield*/, this.getCoinDetails(token)];
                    case 6:
                        coin = _d.sent();
                        coins.push(coin);
                        return [3 /*break*/, 8];
                    case 7:
                        error_5 = _d.sent();
                        console.error('Error processing token event:', error_5);
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 4];
                    case 9: return [2 /*return*/, coins];
                    case 10:
                        error_6 = _d.sent();
                        console.error('Error scanning for new coins:', error_6);
                        return [2 /*return*/, []];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return HyperEVMService;
}());
export { HyperEVMService };
