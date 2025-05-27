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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Chip, } from '@mui/material';
var Leaderboard = function () {
    var leaderboardData = [
        {
            rank: 1,
            address: '0x1a2b3c4d5e6f...',
            nickname: 'CryptoKing',
            totalTokens: 15,
            totalValue: 12500,
            totalTrades: 250,
            roi: 25.5,
            avatar: 'https://via.placeholder.com/40',
        },
        {
            rank: 2,
            address: '0x2b3c4d5e6f7g...',
            nickname: 'TokenMaster',
            totalTokens: 12,
            totalValue: 11000,
            totalTrades: 200,
            roi: 22.3,
            avatar: 'https://via.placeholder.com/40',
        },
        {
            rank: 3,
            address: '0x3c4d5e6f7g8h...',
            nickname: 'SmartTrader',
            totalTokens: 10,
            totalValue: 9500,
            totalTrades: 180,
            roi: 19.8,
            avatar: 'https://via.placeholder.com/40',
        },
        // Add more entries as needed
    ];
    return (_jsxs(Container, __assign({ maxWidth: "lg", sx: { mt: 4, mb: 4 } }, { children: [_jsxs(Box, __assign({ sx: { mb: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h4", component: "h1", gutterBottom: true }, { children: "Leaderboard" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary", paragraph: true }, { children: "Top performers in the Turbo Launchpad community" }))] })), _jsxs(Grid, __assign({ container: true, spacing: 3 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Top Traders" })), _jsx(TableContainer, __assign({ component: Paper }, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Rank" }), _jsx(TableCell, { children: "Trader" }), _jsx(TableCell, __assign({ align: "right" }, { children: "Total Tokens" })), _jsx(TableCell, __assign({ align: "right" }, { children: "Portfolio Value" })), _jsx(TableCell, __assign({ align: "right" }, { children: "Total Trades" })), _jsx(TableCell, __assign({ align: "right" }, { children: "ROI" }))] }) }), _jsx(TableBody, { children: leaderboardData.map(function (trader) { return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Box, __assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: _jsx(Chip, { label: trader.rank, size: "small", sx: {
                                                                            backgroundColor: '#f5f5f5',
                                                                            color: 'primary.main',
                                                                            fontWeight: 'bold',
                                                                            borderRadius: '50%',
                                                                            width: '24px',
                                                                            height: '24px',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                        } }) })) }), _jsx(TableCell, { children: _jsxs(Box, __assign({ sx: { display: 'flex', alignItems: 'center', gap: 1 } }, { children: [_jsx(Avatar, { src: trader.avatar, sx: { width: 32, height: 32 } }), _jsxs(Box, { children: [_jsx(Typography, { children: trader.nickname }), _jsx(Typography, __assign({ variant: "caption", color: "textSecondary" }, { children: trader.address }))] })] })) }), _jsx(TableCell, __assign({ align: "right" }, { children: trader.totalTokens })), _jsxs(TableCell, __assign({ align: "right" }, { children: ["$", trader.totalValue.toLocaleString()] })), _jsx(TableCell, __assign({ align: "right" }, { children: trader.totalTrades })), _jsxs(TableCell, __assign({ align: "right", sx: { color: 'success.main' } }, { children: ["+", trader.roi, "%"] }))] }, trader.address)); }) })] }) }))] }) }) })), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Trading Statistics" })), _jsxs(Grid, __assign({ container: true, spacing: 2 }, { children: [_jsx(Grid, __assign({ item: true, xs: 6, md: 3 }, { children: _jsxs(Box, __assign({ sx: { textAlign: 'center' } }, { children: [_jsx(Typography, __assign({ variant: "h3", component: "div" }, { children: "1,250" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "Total Traders" }))] })) })), _jsx(Grid, __assign({ item: true, xs: 6, md: 3 }, { children: _jsxs(Box, __assign({ sx: { textAlign: 'center' } }, { children: [_jsx(Typography, __assign({ variant: "h3", component: "div" }, { children: "5,000" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "Total Tokens" }))] })) })), _jsx(Grid, __assign({ item: true, xs: 6, md: 3 }, { children: _jsxs(Box, __assign({ sx: { textAlign: 'center' } }, { children: [_jsx(Typography, __assign({ variant: "h3", component: "div" }, { children: "25,000" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "Total Trades" }))] })) })), _jsx(Grid, __assign({ item: true, xs: 6, md: 3 }, { children: _jsxs(Box, __assign({ sx: { textAlign: 'center' } }, { children: [_jsx(Typography, __assign({ variant: "h3", component: "div" }, { children: "$1.2M" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "Total Volume" }))] })) }))] }))] }) }) }))] }))] })));
};
export default Leaderboard;
