import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Turbo Launchpad
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Your Ultimate Memecoin Trading Platform
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/tracker')}
          sx={{ mt: 2 }}
        >
          Start Sniping
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/tracker.png"
              alt="Coin Tracker"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Coin Tracker
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track newly launched memecoins in real-time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/launchpad.png"
              alt="Launchpad"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Launchpad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Launch your own memecoin with ease
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/images/trading.png"
              alt="Trading"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Trading
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Trade memecoins instantly with optimized gas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
