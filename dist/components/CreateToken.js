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
import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { HyperEVMService, config } from '../services/hyperevm';
export var CreateToken = function () {
    var _a = useWeb3React(), account = _a.account, library = _a.library;
    var _b = useState(''), name = _b[0], setName = _b[1];
    var _c = useState(''), symbol = _c[0], setSymbol = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(''), error = _e[0], setError = _e[1];
    var _f = useState(false), success = _f[0], setSuccess = _f[1];
    var handleCreateToken = function () { return __awaiter(void 0, void 0, void 0, function () {
        var provider, signer, hyperEVMService, hypeContract, hypeBalance, tokenFactory, tx, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!account || !library) {
                        setError('Please connect your wallet first');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError('');
                    setSuccess(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    provider = new ethers.providers.Web3Provider(library);
                    signer = provider.getSigner();
                    hyperEVMService = new HyperEVMService();
                    hypeContract = new ethers.Contract(config.contractAddresses.hypeToken, ['function balanceOf(address) view returns (uint256)'], provider);
                    return [4 /*yield*/, hypeContract.balanceOf(account)];
                case 2:
                    hypeBalance = _a.sent();
                    if (hypeBalance.lt(ethers.utils.parseEther('1'))) {
                        throw new Error('Insufficient HYPE balance. Minimum 1 HYPE required.');
                    }
                    tokenFactory = new ethers.Contract(config.contractAddresses.main, [
                        'function createToken(string memory name, string memory symbol) external returns (address)'
                    ], signer);
                    return [4 /*yield*/, tokenFactory.createToken(name, symbol)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    setSuccess(true);
                    setError('');
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    setError(err_1.message);
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Box, __assign({ sx: { maxWidth: 400, mx: 'auto', p: 3 } }, { children: [_jsx(Typography, __assign({ variant: "h4", component: "h1", gutterBottom: true }, { children: "Create New Token" })), _jsx(TextField, { fullWidth: true, label: "Token Name", value: name, onChange: function (e) { return setName(e.target.value); }, margin: "normal", required: true }), _jsx(TextField, { fullWidth: true, label: "Token Symbol", value: symbol, onChange: function (e) { return setSymbol(e.target.value); }, margin: "normal", required: true }), error && (_jsx(Typography, __assign({ color: "error", sx: { mt: 2 } }, { children: error }))), success && (_jsx(Typography, __assign({ color: "success", sx: { mt: 2 } }, { children: "Token created successfully!" }))), _jsx(Button, __assign({ variant: "contained", color: "primary", fullWidth: true, onClick: handleCreateToken, disabled: loading || !name || !symbol, sx: { mt: 2 } }, { children: loading ? _jsx(CircularProgress, { size: 24 }) : 'Create Token' }))] })));
};
