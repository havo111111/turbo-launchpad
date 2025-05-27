var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, IconButton, CircularProgress, useTheme, InputAdornment, Button, } from '@mui/material';
import { Search as SearchIcon, Star as StarIcon, TrendingUp as TrendingIcon } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';
import { HyperEVMService } from '../services/hyperevm';
var hyperEVMService = new HyperEVMService();
var CoinTracker = function () {
    var account = useWeb3React().account;
    var _a = useState([]), coins = _a[0], setCoins = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(''), search = _c[0], setSearch = _c[1];
    var _d = useState([]), favorites = _d[0], setFavorites = _d[1];
    var theme = useTheme();
    useEffect(function () {
        var fetchNewCoins = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newCoins, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, hyperEVMService.scanForNewCoins()];
                    case 1:
                        newCoins = _a.sent();
                        setCoins(newCoins);
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching coins:', error_1);
                        setLoading(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchNewCoins();
        var interval = setInterval(fetchNewCoins, 30000);
        return function () { return clearInterval(interval); };
    }, []);
    var handleToggleFavorite = function (address) {
        setFavorites(function (prev) {
            return prev.includes(address)
                ? prev.filter(function (fav) { return fav !== address; })
                : __spreadArray(__spreadArray([], prev, true), [address], false);
        });
    };
    var handleSnipe = function (coin) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!account) {
                alert('Please connect your wallet first');
                return [2 /*return*/];
            }
            try {
                // Implement advanced sniping logic here
                console.log('Sniping coin:', coin);
            }
            catch (error) {
                console.error('Snipe failed:', error);
                alert('Snipe failed. Please try again.');
            }
            return [2 /*return*/];
        });
    }); };
    var filteredCoins = coins.filter(function (coin) {
        return coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase());
    });
    return (_jsxs(Box, __assign({ sx: { width: '100%', overflow: 'hidden' } }, { children: [_jsx(Typography, __assign({ variant: "h4", gutterBottom: true }, { children: "Token Tracker" })), _jsx(Box, __assign({ sx: { mb: 3 } }, { children: _jsx(TextField, { fullWidth: true, size: "small", placeholder: "Search tokens...", value: search, onChange: function (e) { return setSearch(e.target.value); }, InputProps: {
                        startAdornment: (_jsx(InputAdornment, __assign({ position: "start" }, { children: _jsx(SearchIcon, {}) }))),
                    }, sx: {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.primary.dark,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.dark,
                            },
                        },
                    } }) })), _jsx(Grid, __assign({ container: true, spacing: 3 }, { children: loading ? (_jsx(Grid, __assign({ item: true, xs: 12, style: { textAlign: 'center' } }, { children: _jsx(CircularProgress, {}) }))) : (_jsx(Grid, __assign({ container: true, spacing: 3 }, { children: filteredCoins.map(function (coin) { return (_jsx(Grid, __assign({ item: true, xs: 12, sm: 6, md: 4 }, { children: _jsxs(Paper, __assign({ elevation: 3, sx: {
                                p: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            } }, { children: [_jsxs(Box, { children: [_jsxs(Typography, __assign({ variant: "h6", gutterBottom: true }, { children: [coin.name, " (", coin.symbol, ")"] })), _jsxs(Box, __assign({ sx: { display: 'flex', alignItems: 'center', mb: 2 } }, { children: [_jsxs(Typography, __assign({ variant: "body1", sx: { fontWeight: 'bold', mr: 1 } }, { children: ["$", coin.price.toLocaleString(), " HYPE"] })), _jsxs(Box, __assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(TrendingIcon, { sx: { color: coin.priceChange24h > 0 ? 'success.main' : 'error.main', mr: 0.5 } }), _jsxs(Typography, __assign({ variant: "body2", sx: { color: coin.priceChange24h > 0 ? 'success.main' : 'error.main' } }, { children: [coin.priceChange24h.toFixed(2), "%"] }))] }))] }))] }), _jsxs(Box, __assign({ sx: { mb: 2 } }, { children: [_jsxs(Typography, __assign({ variant: "body2", color: "textSecondary" }, { children: ["Market Cap: $", coin.marketCap.toLocaleString()] })), _jsxs(Typography, __assign({ variant: "body2", color: "textSecondary" }, { children: ["Volume 24h: $", coin.volume24h.toLocaleString()] })), _jsxs(Typography, __assign({ variant: "body2", color: "textSecondary" }, { children: ["Liquidity: $", coin.liquidity.toLocaleString()] }))] })), coin.isBonding && (_jsxs(Box, __assign({ sx: { mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 } }, { children: [_jsx(Typography, __assign({ variant: "subtitle2", color: "primary" }, { children: "Bonding Progress" })), _jsxs(Box, __assign({ sx: { display: 'flex', alignItems: 'center', mt: 1 } }, { children: [_jsx(Box, __assign({ sx: { width: '100%', mr: 1 } }, { children: _jsx(Box, __assign({ sx: {
                                                            height: 8,
                                                            borderRadius: 2,
                                                            backgroundColor: 'grey.200',
                                                            position: 'relative',
                                                        } }, { children: _jsx(Box, { sx: {
                                                                height: '100%',
                                                                borderRadius: 2,
                                                                backgroundColor: 'primary.main',
                                                                width: "".concat(coin.bondingProgress, "%"),
                                                            } }) })) })), _jsxs(Typography, __assign({ variant: "body2", sx: { ml: 1 } }, { children: [coin.bondingProgress.toFixed(2), "%"] }))] })), _jsxs(Typography, __assign({ variant: "body2", color: "textSecondary", sx: { mt: 1 } }, { children: ["Bonding Price: $", coin.bondingPrice, " HYPE"] })), _jsxs(Typography, __assign({ variant: "body2", color: "textSecondary" }, { children: ["APY: ", coin.bondingAPY.toFixed(2), "%"] }))] }))), _jsxs(Box, __assign({ sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' } }, { children: [_jsx(IconButton, __assign({ onClick: function () { return handleToggleFavorite(coin.address); } }, { children: _jsx(StarIcon, { sx: { color: favorites.includes(coin.address) ? 'warning.main' : 'inherit' } }) })), _jsxs(Button, __assign({ variant: "contained", color: "primary", onClick: function () { return handleSnipe(coin); }, disabled: !account }, { children: ["Buy $", coin.symbol] })), _jsx(Button, __assign({ variant: "outlined", color: "primary", onClick: function () { return handleSnipe(coin); }, disabled: !account }, { children: coin.buyTax > 0 ? "Buy Tax: ".concat(coin.buyTax, "%") : 'No Buy Tax' }))] }))] })) }), coin.address)); }) }))) }))] })));
};
export default CoinTracker;
