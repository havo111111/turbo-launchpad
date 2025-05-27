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
import { Box, Typography, Paper, Button, } from '@mui/material';
var Trading = function () {
    return (_jsxs(Paper, __assign({ elevation: 3, sx: { p: 4 } }, { children: [_jsx(Typography, __assign({ variant: "h4", component: "h1", gutterBottom: true }, { children: "Trading Platform" })), _jsx(Typography, __assign({ variant: "body1", paragraph: true }, { children: "Welcome to the Turbo Trading Platform! Here you can trade your crypto tokens." })), _jsx(Box, __assign({ sx: { mt: 4 } }, { children: _jsx(Button, __assign({ variant: "contained", color: "primary", fullWidth: true }, { children: "Start Trading" })) }))] })));
};
export default Trading;
