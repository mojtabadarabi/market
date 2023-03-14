import productsReducer from '@/components/products/productsSlice'
import mainReducer from '@/mainSlice/slice'
import {createWrapper} from 'next-redux-wrapper';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { baseApi } from '@/services/baseApi';

export const makeStore = () => configureStore({
    reducer: {
        products:productsReducer,
        main:mainReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, AppState, unknown, Action >;

export const wrapper = createWrapper<AppStore>(makeStore);
