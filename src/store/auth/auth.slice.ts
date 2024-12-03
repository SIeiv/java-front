import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfileResponse} from "@/api/auth/types.ts";

const initialState = {
    authData: {
        accessToken: null as null | string,
        isLoading: false as boolean,
        error: null as null | string,
    },
    regData: {
        isLoading: false as boolean,
        error: null as null | string,
    },
    profileData: {
        profile: null as null | IProfileResponse,
        isLoading: false as boolean,
        error: null as null | string,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.authData.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.authData.accessToken = action.payload;
            state.authData.isLoading = false;
            state.authData.error = null;
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.authData.isLoading = false;
            state.authData.error = action.payload;
        },

        regStart: (state) => {
            state.regData.isLoading = true;
        },
        regSuccess: (state) => {
            state.regData.isLoading = false;
            state.regData.error = null;
        },
        regFail: (state, action: PayloadAction<string>) => {
            state.regData.isLoading = false;
            state.regData.error = action.payload;
        },

        loadProfileStart: (state) => {
            state.profileData.isLoading = true;
        },
        loadProfileSuccess: (state, action: PayloadAction<string>) => {
            state.profileData.profile = action.payload;
            state.profileData.isLoading = false;
            state.profileData.error = null;
        },
        loadProfileFail: (state, action: PayloadAction<string>) => {
            state.profileData.isLoading = false;
            state.profileData.error = action.payload;
        },

        clearAccessToken: (state) => {
            state.authData.accessToken = null;
        }
    }
})

export const {
    loginStart, loginSuccess, loginFail, loadProfileStart, loadProfileSuccess, loadProfileFail,
    regFail, regSuccess, regStart, clearAccessToken
} = authSlice.actions;

export default authSlice.reducer;