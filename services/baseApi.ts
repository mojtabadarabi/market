import {createApi} from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type {AxiosRequestConfig, AxiosError} from 'axios'
import type {BaseQueryFn, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {tokenReceived, loggedOut} from './slice'
import {getCookie} from "cookies-next";
import {HYDRATE} from "next-redux-wrapper";
import {notifyFailure, notifySuccess} from '@/helpers/view';
import {i18n} from "next-i18next";
import i18next from "i18next";
import {getLang} from "@/helpers";


type Fn = BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    headers?: AxiosRequestConfig['headers']
    params?: AxiosRequestConfig['params']
},
    unknown,
    unknown>

const BASE_URL = 'http://localhost:3000/api';

const baseQuery: Fn = async ({url, method, data, headers, params}) => {
    try {
        const token = getCookie('Token');
        const headersWithToken :any = {...headers};
        if (token) {
            headersWithToken.Authorization = `Bearer ${token}`;
        }

        const result = await axios({url: BASE_URL + url, method, data, headers: headersWithToken, params})
        notifySuccess(result);
        return {data: result.data}

    } catch (axiosError) {
        let err = axiosError as AxiosError
        notifyFailure(err);

        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

const isError = (maybeError: any): maybeError is FetchBaseQueryError => {
    return (maybeError && maybeError.status)
}

// @ts-ignore
const baseQueryWithReauth: Fn = async (args, api, extraOptions) => {
    const {main:{lang}}:any = api.getState()
    const langCookie = getCookie('lang')
    let result = await baseQuery({...args,headers:{...args.headers}}, api, extraOptions);
    const refershToken = getCookie('refreshToken');
    if (isError(result.error) && result.error.status === 401) {
        if (!refershToken) return void api.dispatch(loggedOut());
        const refreshResult = await baseQuery({
            url: '/user/refresh_token',
            method: 'POST',
            data: {refresh_token: refershToken},
        }, api, extraOptions) as ({ data: { access_token: string, refresh_token: string } } | FetchBaseQueryError);
        // T0do: What if we got a 500 error???
        // if refreshResult.data exists, it means the fetch was successful
        if (!isError(refreshResult) && refreshResult.data) {
            const {access_token, refresh_token} = refreshResult.data;
            api.dispatch(tokenReceived({accessToken: access_token, refreshToken: refresh_token}));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(loggedOut());
        }
    }
    return result
}

export const baseApi = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    // tagTypes: ['attractions', 'attraction', 'events', 'event', 'favorites','conversations'],
    endpoints: () => ({}),
})
