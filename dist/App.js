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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
// Components
import Layout from './components/Layout';
import Home from './components/Home';
import CoinTracker from './components/CoinTracker';
import Launchpad from './components/Launchpad';
import Portfolio from './components/Portfolio';
import Leaderboard from './components/Leaderboard';
import { TokenList } from './components/TokenList';
import { CreateToken } from './components/CreateToken';
import { TokenBonding } from './components/TokenBonding';
var theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
        },
        secondary: {
            main: '#2196F3',
            light: '#64B5F6',
            dark: '#1976D2',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
    },
});
var App = function () {
    return (_jsx(Provider, __assign({ store: store }, { children: _jsxs(ThemeProvider, __assign({ theme: theme }, { children: [_jsx(CssBaseline, {}), _jsx(Router, { children: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/coins", element: _jsx(CoinTracker, {}) }), _jsx(Route, { path: "/launchpad", element: _jsx(Launchpad, {}) }), _jsx(Route, { path: "/portfolio", element: _jsx(Portfolio, {}) }), _jsx(Route, { path: "/leaderboard", element: _jsx(Leaderboard, {}) }), _jsx(Route, { path: "/tokens", element: _jsx(TokenList, {}) }), _jsx(Route, { path: "/create-token", element: _jsx(CreateToken, {}) }), _jsx(Route, { path: "/token/:address", element: _jsx(TokenBonding, { tokenAddress: window.location.pathname.split('/')[2] }) })] }) }) })] })) })));
};
export default App;
