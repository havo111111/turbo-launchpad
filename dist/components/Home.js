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
import { Box, Typography, Button, Grid, Container, Paper, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
var Home = function () {
    var navigate = useNavigate();
    return (_jsxs(Container, __assign({ maxWidth: "lg", sx: { mt: 4, mb: 4 } }, { children: [_jsxs(Box, __assign({ sx: { textAlign: 'center', mb: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h2", component: "h1", gutterBottom: true }, { children: "Turbo Launchpad" })), _jsx(Typography, __assign({ variant: "h5", color: "textSecondary", paragraph: true }, { children: "Your Intelligent Token Launchpad and Trading Platform" })), _jsx(Button, __assign({ variant: "contained", color: "primary", size: "large", onClick: function () { return navigate('/tokens'); }, sx: { mt: 2 } }, { children: "Explore Tokens" }))] })), _jsxs(Grid, __assign({ container: true, spacing: 4 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, md: 4 }, { children: _jsxs(Paper, __assign({ elevation: 3, sx: {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3,
                            } }, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Token Launching" })), _jsx(Typography, __assign({ variant: "body1", color: "text.secondary" }, { children: "Launch your own tokens with AI-powered optimization" })), _jsx(Button, __assign({ variant: "outlined", onClick: function () { return navigate('/create'); }, sx: { mt: 2 } }, { children: "Launch Token" }))] })) })), _jsx(Grid, __assign({ item: true, xs: 12, md: 4 }, { children: _jsxs(Paper, __assign({ elevation: 3, sx: {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3,
                            } }, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Token Trading" })), _jsx(Typography, __assign({ variant: "body1", color: "text.secondary" }, { children: "Trade tokens instantly with AI-powered smart routing" })), _jsx(Button, __assign({ variant: "outlined", onClick: function () { return navigate('/tokens'); }, sx: { mt: 2 } }, { children: "Trade Tokens" }))] })) })), _jsx(Grid, __assign({ item: true, xs: 12, md: 4 }, { children: _jsxs(Paper, __assign({ elevation: 3, sx: {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3,
                            } }, { children: [_jsx(Typography, __assign({ variant: "h5", gutterBottom: true }, { children: "Portfolio" })), _jsx(Typography, __assign({ variant: "body1", color: "text.secondary" }, { children: "Track your token portfolio and performance" })), _jsx(Button, __assign({ variant: "outlined", onClick: function () { return navigate('/portfolio'); }, sx: { mt: 2 } }, { children: "View Portfolio" }))] })) }))] }))] })));
};
export default Home;
