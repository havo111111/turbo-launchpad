import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import { PrivyProviderWrapper } from './providers/PrivyProvider';

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

const theme = createTheme({
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins" element={<CoinTracker />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/tokens" element={<TokenList />} />
              <Route path="/create-token" element={<CreateToken />} />
              <Route path="/token/:address" element={<TokenBonding tokenAddress={window.location.pathname.split('/')[2]} />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
