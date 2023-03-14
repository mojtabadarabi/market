import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {State} from "./types";
import i18next from "i18next";

const initialState: Partial<State> = {
    lang: 'fa'
}

export const MainSlice = createSlice({
    name: 'MainReducer',
    initialState,
    reducers: {
        changeLang(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        },
    },
})

export const {changeLang} = MainSlice.actions
export default MainSlice.reducer