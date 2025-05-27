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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import MenuIcon from '@mui/icons-material/Menu';
import TokenIcon from '@mui/icons-material/Token';
import LaunchIcon from '@mui/icons-material/Launch';
import PortfolioIcon from '@mui/icons-material/AccountBalanceWallet';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useNavigate } from 'react-router-dom';
var injected = new InjectedConnector({
    supportedChainIds: [56], // BSC Mainnet
});
var walletconnect = new WalletConnectConnector({
    rpc: {
        56: 'https://bsc-dataseed.binance.org/',
    },
});
var menuItems = [
    { text: 'Tokens', icon: _jsx(TokenIcon, {}), path: '/tokens' },
    { text: 'Create', icon: _jsx(LaunchIcon, {}), path: '/create' },
    { text: 'Portfolio', icon: _jsx(PortfolioIcon, {}), path: '/portfolio' },
    { text: 'Leaderboard', icon: _jsx(LeaderboardIcon, {}), path: '/leaderboard' },
];
var Layout = function (_a) {
    var children = _a.children;
    var _b = useWeb3React(), active = _b.active, account = _b.account, activate = _b.activate, deactivate = _b.deactivate;
    var _c = React.useState(false), drawerOpen = _c[0], setDrawerOpen = _c[1];
    var navigate = useNavigate();
    var handleConnect = function (connector) { return __awaiter(void 0, void 0, void 0, function () {
        var ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, activate(connector)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    ex_1 = _a.sent();
                    console.error("Failed to connect", ex_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDisconnect = function () {
        deactivate();
    };
    var handleMenuClick = function (path) {
        navigate(path);
        setDrawerOpen(false);
    };
    return (_jsxs(Box, __assign({ sx: { display: 'flex' } }, { children: [_jsx(AppBar, __assign({ position: "static" }, { children: _jsxs(Toolbar, { children: [_jsx(IconButton, __assign({ color: "inherit", "aria-label": "open drawer", edge: "start", onClick: function () { return setDrawerOpen(true); }, sx: { mr: 2 } }, { children: _jsx(MenuIcon, {}) })), _jsx(Typography, __assign({ variant: "h6", component: "div", sx: { flexGrow: 1 } }, { children: "Turbo Launchpad" })), _jsx(Button, __assign({ color: "inherit", onClick: function () { return handleConnect(injected); } }, { children: "Connect Wallet" })), _jsx(Button, __assign({ color: "inherit", onClick: function () { return handleConnect(walletconnect); } }, { children: "WalletConnect" })), active && (_jsxs(_Fragment, { children: [_jsx(Button, __assign({ color: "inherit", onClick: handleDisconnect }, { children: "Disconnect" })), _jsxs(Typography, __assign({ variant: "body2", color: "inherit", sx: { ml: 2 } }, { children: [account === null || account === void 0 ? void 0 : account.slice(0, 6), "...", account === null || account === void 0 ? void 0 : account.slice(-4)] }))] }))] }) })), _jsx(Drawer, __assign({ anchor: "left", open: drawerOpen, onClose: function () { return setDrawerOpen(false); } }, { children: _jsx(List, { children: menuItems.map(function (item) { return (_jsxs(ListItem, __assign({ button: true, onClick: function () { return handleMenuClick(item.path); } }, { children: [_jsx(ListItemIcon, { children: item.icon }), _jsx(ListItemText, { primary: item.text })] }), item.text)); }) }) })), _jsx(Box, __assign({ component: "main", sx: { flexGrow: 1, p: 3 } }, { children: children }))] })));
};
export default Layout;
