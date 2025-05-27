export declare const setGasLimit: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "preferences/setGasLimit">, setSlippage: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "preferences/setSlippage">, toggleFavoriteToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "preferences/toggleFavoriteToken">;
export declare const setWalletState: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "wallet/setWalletState">;
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    preferences: {
        gasLimit: number;
        slippage: number;
        favoriteTokens: string[];
    };
    wallet: {
        isConnected: boolean;
        account: string;
        chainId: number | null;
    };
}, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<{
    preferences: {
        gasLimit: number;
        slippage: number;
        favoriteTokens: string[];
    };
    wallet: {
        isConnected: boolean;
        account: string;
        chainId: number | null;
    };
}, import("redux").AnyAction, undefined>]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
