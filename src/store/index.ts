import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for user preferences
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    gasLimit: 21000,
    slippage: 1,
    favoriteTokens: [] as string[],
  },
  reducers: {
    setGasLimit: (state, action) => {
      state.gasLimit = action.payload;
    },
    setSlippage: (state, action) => {
      state.slippage = action.payload;
    },
    toggleFavoriteToken: (state, action) => {
      const tokenAddress = action.payload;
      if (state.favoriteTokens.includes(tokenAddress)) {
        state.favoriteTokens = state.favoriteTokens.filter(
          (addr) => addr !== tokenAddress
        );
      } else {
        state.favoriteTokens.push(tokenAddress);
      }
    },
  },
});

// Create a slice for wallet state
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    isConnected: false,
    account: '',
    chainId: null as number | null,
  },
  reducers: {
    setWalletState: (state, action) => {
      state.isConnected = action.payload.isConnected;
      state.account = action.payload.account;
      state.chainId = action.payload.chainId;
    },
  },
});

export const {
  setGasLimit,
  setSlippage,
  toggleFavoriteToken,
} = preferencesSlice.actions;

export const {
  setWalletState,
} = walletSlice.actions;

export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
    wallet: walletSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
