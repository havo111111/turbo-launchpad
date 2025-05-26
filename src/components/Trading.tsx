import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';

const Trading: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Trading Platform
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Turbo Trading Platform! Here you can trade your crypto tokens.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" fullWidth>
          Start Trading
        </Button>
      </Box>
    </Paper>
  );
};

export default Trading;
