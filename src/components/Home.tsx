import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Turbo Launchpad
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Your Intelligent Token Launchpad and Trading Platform
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/tokens')}
          sx={{ mt: 2 }}
        >
          Explore Tokens
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <img src="/images/placeholder-token.png" alt="Token Launching" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Token Launching
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Launch your own tokens with AI-powered optimization
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/create')}
              sx={{ mt: 2 }}
            >
              Launch Token
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <img src="/images/placeholder-launchpad.png" alt="Token Trading" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Token Trading
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Trade tokens instantly with AI-powered smart routing
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/tokens')}
              sx={{ mt: 2 }}
            >
              Trade Tokens
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your token portfolio and performance
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/portfolio')}
              sx={{ mt: 2 }}
            >
              View Portfolio
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
