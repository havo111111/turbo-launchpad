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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { HyperEVMService } from '../services/hyperevm';
export var TokenList = function () {
    var library = useWeb3React().library;
    var _a = useState([]), tokens = _a[0], setTokens = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    useEffect(function () {
        var fetchTokens = function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, hyperEVMService, newTokens, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!library)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        provider = new ethers.providers.Web3Provider(library);
                        hyperEVMService = new HyperEVMService();
                        return [4 /*yield*/, hyperEVMService.scanForNewCoins()];
                    case 2:
                        newTokens = _a.sent();
                        setTokens(newTokens);
                        setError('');
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError(err_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchTokens();
        var interval = setInterval(fetchTokens, 30000);
        return function () { return clearInterval(interval); };
    }, [library]);
    if (loading) {
        return (_jsx(Box, __assign({ sx: { display: 'flex', justifyContent: 'center', py: 4 } }, { children: _jsx(CircularProgress, {}) })));
    }
    if (error) {
        return (_jsx(Box, __assign({ sx: { py: 4 } }, { children: _jsx(Typography, __assign({ color: "error", align: "center" }, { children: error })) })));
    }
    return (_jsxs(Box, __assign({ sx: { py: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h4", component: "h1", gutterBottom: true }, { children: "Available Tokens" })), _jsx(Grid, __assign({ container: true, spacing: 3 }, { children: tokens.map(function (token) { return (_jsx(Grid, __assign({ item: true, xs: 12, sm: 6, md: 4 }, { children: _jsxs(Card, { children: [_jsxs(CardContent, { children: [_jsxs(Typography, __assign({ variant: "h5", component: "div" }, { children: [token.name, " (", token.symbol, ")"] })), _jsxs(Typography, __assign({ variant: "body2", color: "text.secondary" }, { children: ["Market Cap: $", Number(token.marketCap).toFixed(2)] })), _jsxs(Typography, __assign({ variant: "body2", color: "text.secondary" }, { children: ["Total Supply: ", Number(token.totalSupply).toFixed(2)] })), _jsxs(Typography, __assign({ variant: "body2", color: "text.secondary" }, { children: ["Bonding Progress: ", Number(token.bondingProgress).toFixed(2), "%"] }))] }), _jsx(CardActions, { children: _jsx(Button, __assign({ size: "small", color: "primary", href: "/token/".concat(token.address) }, { children: "View Details" })) })] }) }), token.address)); }) }))] })));
};
