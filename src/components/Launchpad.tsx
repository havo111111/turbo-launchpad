import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
} from '@mui/material';

const Launchpad: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Token Launchpad
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Turbo Launchpad! Here you can launch your own crypto tokens.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" fullWidth>
          Launch New Token
        </Button>
      </Box>
    </Paper>
  );
};

export default Launchpad;
