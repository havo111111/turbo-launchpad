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
import { Box, Container, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
var Portfolio = function () {
    var portfolioData = [
        {
            token: 'TURBO',
            balance: '100.00',
            price: '$0.05',
            value: '$5.00',
            change: '+2.5%',
        },
        {
            token: 'MEME',
            balance: '500.00',
            price: '$0.01',
            value: '$5.00',
            change: '+1.2%',
        },
        {
            token: 'AI',
            balance: '200.00',
            price: '$0.02',
            value: '$4.00',
            change: '-0.8%',
        },
    ];
    return (_jsxs(Container, __assign({ maxWidth: "lg", sx: { mt: 4, mb: 4 } }, { children: [_jsxs(Box, __assign({ sx: { mb: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h4", component: "h1", gutterBottom: true }, { children: "Portfolio" })), _jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary", paragraph: true }, { children: "Your token holdings and performance" }))] })), _jsxs(Grid, __assign({ container: true, spacing: 3 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(Card, __assign({ sx: { height: '100%' } }, { children: _jsxs(CardContent, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Total Portfolio Value" })), _jsx(Typography, __assign({ variant: "h3", component: "div" }, { children: "$14.00" })), _jsx(Typography, __assign({ color: "success.main", sx: { display: 'flex', alignItems: 'center' } }, { children: "+3.5% Today" }))] }) })) })), _jsx(Grid, __assign({ item: true, xs: 12, md: 6 }, { children: _jsx(Card, __assign({ sx: { height: '100%' } }, { children: _jsxs(CardContent, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "24h Performance" })), _jsxs(Grid, __assign({ container: true, spacing: 2 }, { children: [_jsxs(Grid, __assign({ item: true, xs: 6 }, { children: [_jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "Total Tokens" })), _jsx(Typography, __assign({ variant: "h6" }, { children: "3" }))] })), _jsxs(Grid, __assign({ item: true, xs: 6 }, { children: [_jsx(Typography, __assign({ variant: "subtitle1", color: "textSecondary" }, { children: "ROI" })), _jsx(Typography, __assign({ variant: "h6" }, { children: "+12.5%" }))] }))] }))] }) })) }))] })), _jsxs(Box, __assign({ sx: { mt: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Token Holdings" })), _jsx(TableContainer, __assign({ component: Paper }, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Token" }), _jsx(TableCell, __assign({ align: "right" }, { children: "Balance" })), _jsx(TableCell, __assign({ align: "right" }, { children: "Price" })), _jsx(TableCell, __assign({ align: "right" }, { children: "Value" })), _jsx(TableCell, __assign({ align: "right" }, { children: "24h Change" }))] }) }), _jsx(TableBody, { children: portfolioData.map(function (token) { return (_jsxs(TableRow, { children: [_jsx(TableCell, __assign({ component: "th", scope: "row" }, { children: token.token })), _jsx(TableCell, __assign({ align: "right" }, { children: token.balance })), _jsx(TableCell, __assign({ align: "right" }, { children: token.price })), _jsx(TableCell, __assign({ align: "right" }, { children: token.value })), _jsx(TableCell, __assign({ align: "right", sx: { color: token.change.startsWith('+') ? 'success.main' : 'error.main' } }, { children: token.change }))] }, token.token)); }) })] }) }))] }))] })));
};
export default Portfolio;
