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
import { Box, Button, TextField, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem, CircularProgress, } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Web3Service } from '../services/web3Service';
import { GAS_CONFIG, DEFAULT_SLIPPAGE } from '../config/constants';
import { ethers } from 'ethers';
var SnipingSystem = function () {
    var _a = useWeb3React(), account = _a.account, library = _a.library;
    var web3Service = new Web3Service(library);
    var _b = useState({
        gasLimit: GAS_CONFIG.defaultGasLimit,
        slippage: DEFAULT_SLIPPAGE,
        tokenAddress: '',
        amount: '0',
    }), settings = _b[0], setSettings = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(''), gasPrice = _d[0], setGasPrice = _d[1];
    useEffect(function () {
        var updateGasPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
            var price, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, web3Service.getGasPrice()];
                    case 1:
                        price = _a.sent();
                        setGasPrice(ethers.utils.formatUnits(price, 'gwei'));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching gas price:', error_1);
                        setGasPrice('N/A');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        updateGasPrice();
        var interval = setInterval(updateGasPrice, 30000); // Update every 30 seconds
        return function () { return clearInterval(interval); };
    }, [library]);
    var handleSnipe = function () { return __awaiter(void 0, void 0, void 0, function () {
        var amountWei, tx, txResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!account) {
                        alert('Please connect your wallet first');
                        return [2 /*return*/];
                    }
                    if (!settings.tokenAddress || !settings.amount) {
                        alert('Please fill in all required fields');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setLoading(true);
                    amountWei = ethers.utils.parseEther(settings.amount);
                    tx = {
                        to: settings.tokenAddress,
                        value: amountWei,
                        gasLimit: settings.gasLimit,
                        maxPriorityFeePerGas: GAS_CONFIG.maxPriorityFeePerGas,
                        maxFeePerGas: GAS_CONFIG.maxFeePerGas,
                    };
                    return [4 /*yield*/, web3Service.sendTransaction(settings.tokenAddress, amountWei, '0x', // Data field for token transfer
                        settings.gasLimit)];
                case 2:
                    txResponse = _a.sent();
                    // Wait for transaction confirmation
                    return [4 /*yield*/, txResponse.wait()];
                case 3:
                    // Wait for transaction confirmation
                    _a.sent();
                    alert('Snipe successful!');
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Snipe failed:', error_2);
                    alert('Snipe failed. Please try again.');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Box, __assign({ sx: { p: 3 } }, { children: [_jsx(Typography, __assign({ variant: "h4", gutterBottom: true }, { children: "Sniping System" })), _jsxs(Paper, __assign({ sx: { p: 3, mb: 3 } }, { children: [_jsx(Typography, __assign({ variant: "h6", gutterBottom: true }, { children: "Current Settings" })), _jsxs(Box, __assign({ sx: { display: 'flex', gap: 2, mb: 2 } }, { children: [_jsxs(FormControl, __assign({ fullWidth: true }, { children: [_jsx(InputLabel, { children: "Token Address" }), _jsx(Select, __assign({ value: settings.tokenAddress, onChange: function (e) { return setSettings(__assign(__assign({}, settings), { tokenAddress: e.target.value })); }, label: "Token Address" }, { children: _jsx(MenuItem, __assign({ value: "" }, { children: "Select a token" })) }))] })), _jsx(TextField, { label: "Amount (BNB)", type: "number", value: settings.amount, onChange: function (e) { return setSettings(__assign(__assign({}, settings), { amount: e.target.value })); }, fullWidth: true })] })), _jsxs(Box, __assign({ sx: { display: 'flex', gap: 2, mb: 2 } }, { children: [_jsxs(Box, __assign({ sx: { width: '50%' } }, { children: [_jsx(Typography, __assign({ variant: "subtitle1", gutterBottom: true }, { children: "Gas Limit" })), _jsx(Slider, { value: settings.gasLimit, onChange: function (e, value) { return setSettings(__assign(__assign({}, settings), { gasLimit: value })); }, min: 21000, max: 1000000, step: 1000, valueLabelDisplay: "auto" })] })), _jsxs(Box, __assign({ sx: { width: '50%' } }, { children: [_jsx(Typography, __assign({ variant: "subtitle1", gutterBottom: true }, { children: "Slippage" })), _jsx(Slider, { value: settings.slippage, onChange: function (e, value) { return setSettings(__assign(__assign({}, settings), { slippage: value })); }, min: 0.1, max: 10, step: 0.1, valueLabelDisplay: "auto" })] }))] })), _jsxs(Typography, __assign({ variant: "subtitle1", gutterBottom: true }, { children: ["Current Gas Price: ", gasPrice, " Gwei"] })), _jsx(Button, __assign({ variant: "contained", color: "primary", onClick: handleSnipe, disabled: loading || !account, fullWidth: true }, { children: loading ? _jsx(CircularProgress, { size: 24 }) : 'Snipe Now' }))] }))] })));
};
export default SnipingSystem;
