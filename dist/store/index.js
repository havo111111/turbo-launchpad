var _a;
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
// Create a slice for user preferences
var preferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        gasLimit: 21000,
        slippage: 1,
        favoriteTokens: [],
    },
    reducers: {
        setGasLimit: function (state, action) {
            state.gasLimit = action.payload;
        },
        setSlippage: function (state, action) {
            state.slippage = action.payload;
        },
        toggleFavoriteToken: function (state, action) {
            var tokenAddress = action.payload;
            if (state.favoriteTokens.includes(tokenAddress)) {
                state.favoriteTokens = state.favoriteTokens.filter(function (addr) { return addr !== tokenAddress; });
            }
            else {
                state.favoriteTokens.push(tokenAddress);
            }
        },
    },
});
// Create a slice for wallet state
var walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        isConnected: false,
        account: '',
        chainId: null,
    },
    reducers: {
        setWalletState: function (state, action) {
            state.isConnected = action.payload.isConnected;
            state.account = action.payload.account;
            state.chainId = action.payload.chainId;
        },
    },
});
export var setGasLimit = (_a = preferencesSlice.actions, _a.setGasLimit), setSlippage = _a.setSlippage, toggleFavoriteToken = _a.toggleFavoriteToken;
export var setWalletState = walletSlice.actions.setWalletState;
export var store = configureStore({
    reducer: {
        preferences: preferencesSlice.reducer,
        wallet: walletSlice.reducer,
    },
});
export default store;
