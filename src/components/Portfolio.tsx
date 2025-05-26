import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const Portfolio: React.FC = () => {

  const portfolioData = [
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Portfolio
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Your token holdings and performance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography variant="h3" component="div">
                $14.00
              </Typography>
              <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                +3.5% Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                24h Performance
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Tokens
                  </Typography>
                  <Typography variant="h6">3</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    ROI
                  </Typography>
                  <Typography variant="h6">+12.5%</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Token Holdings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">24h Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioData.map((token) => (
                <TableRow key={token.token}>
                  <TableCell component="th" scope="row">
                    {token.token}
                  </TableCell>
                  <TableCell align="right">{token.balance}</TableCell>
                  <TableCell align="right">{token.price}</TableCell>
                  <TableCell align="right">{token.value}</TableCell>
                  <TableCell align="right" sx={{ color: token.change.startsWith('+') ? 'success.main' : 'error.main' }}>
                    {token.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Portfolio;
