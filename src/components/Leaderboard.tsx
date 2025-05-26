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
  Avatar,
  Chip,
} from '@mui/material';

const Leaderboard: React.FC = () => {
  const leaderboardData = [
    {
      rank: 1,
      address: '0x1a2b3c4d5e6f...',
      nickname: 'CryptoKing',
      totalTokens: 15,
      totalValue: 12500,
      totalTrades: 250,
      roi: 25.5,
      avatar: 'https://via.placeholder.com/40',
    },
    {
      rank: 2,
      address: '0x2b3c4d5e6f7g...',
      nickname: 'TokenMaster',
      totalTokens: 12,
      totalValue: 11000,
      totalTrades: 200,
      roi: 22.3,
      avatar: 'https://via.placeholder.com/40',
    },
    {
      rank: 3,
      address: '0x3c4d5e6f7g8h...',
      nickname: 'SmartTrader',
      totalTokens: 10,
      totalValue: 9500,
      totalTrades: 180,
      roi: 19.8,
      avatar: 'https://via.placeholder.com/40',
    },
    // Add more entries as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Leaderboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Top performers in the Turbo Launchpad community
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Top Traders
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Trader</TableCell>
                      <TableCell align="right">Total Tokens</TableCell>
                      <TableCell align="right">Portfolio Value</TableCell>
                      <TableCell align="right">Total Trades</TableCell>
                      <TableCell align="right">ROI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboardData.map((trader) => (
                      <TableRow key={trader.address}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip
                              label={trader.rank}
                              size="small"
                              sx={{
                                backgroundColor: '#f5f5f5',
                                color: 'primary.main',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar src={trader.avatar} sx={{ width: 32, height: 32 }} />
                            <Box>
                              <Typography>{trader.nickname}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {trader.address}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{trader.totalTokens}</TableCell>
                        <TableCell align="right">${trader.totalValue.toLocaleString()}</TableCell>
                        <TableCell align="right">{trader.totalTrades}</TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}>
                          +{trader.roi}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Trading Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="div">
                      1,250
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Traders
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="div">
                      5,000
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Tokens
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="div">
                      25,000
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Trades
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="div">
                      $1.2M
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Volume
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Leaderboard;
