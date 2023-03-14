import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {State} from "./types";
import {setCookie, removeCookies} from "cookies-next";
import Router from 'next/router';
import {login} from '@/constants/Links';

const initialState: Partial<State> = {}

export const AuthSlice = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        tokenReceived(state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) {
            const {refreshToken, accessToken} = action.payload;
            setCookie('Token', accessToken);
            setCookie('refreshToken', refreshToken);
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },

        refreshTokenAdded(state, {payload}: PayloadAction<string>) {
            state.refreshToken = payload;
        },

        loggedOut() {
            removeCookies('Token');
            removeCookies('refreshToken');
            removeCookies('Login');
            Router.push(`${login}?redirect=${Router.pathname}`);
            // remove the old token and refreshToken from state.
            return {};
        },
    },
})

export const {tokenReceived, refreshTokenAdded, loggedOut} = AuthSlice.actions
export default AuthSlice.reducer