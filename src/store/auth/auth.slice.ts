import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfileResponse} from "@/api/profile/types.ts";

const initialState = {
    authData: {
        accessToken: null as null | string,
        isLoading: false as boolean,
        error: null as null | string,
    },
    logoutData: {
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
    },

    avatarData: {
        avatar: null as any,
        isLoading: false as boolean,
        error: null as null | string
    },

    appInitializeData: {
        initialized: false,
        isLoading: false as boolean,
        error: null as null | string
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

        logoutStart: (state) => {
            state.logoutData.isLoading = true;
        },
        logoutSuccess: (state) => {
            state.logoutData.isLoading = false;
            state.logoutData.error = null;
        },
        logoutFail: (state, action: PayloadAction<string>) => {
            state.logoutData.isLoading = false;
            state.logoutData.error = action.payload;
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

        clearProfileData: (state) => {
            state.authData.accessToken = null;
            state.profileData.profile = null;
            state.avatarData.avatar = null;
        },
        avatarStart: (state) => {
            state.avatarData.isLoading = true
        },
        avatarSuccess: (state, action: PayloadAction<any>) => {
            state.avatarData.avatar = action.payload;
            state.avatarData.isLoading = false;
        },
        avatarFail: (state, action: PayloadAction<string>) => {
            state.avatarData.isLoading = false;
            state.avatarData.error = action.payload;
        },

        setRegisterError: (state, action: PayloadAction<string>) => {
            state.regData.error = action.payload;
        },

        appInitializeStart: (state) => {
            state.appInitializeData.isLoading = true
        },
        appInitializeSuccess: (state) => {
            state.appInitializeData.initialized = true;
            state.appInitializeData.isLoading = false;
        },
        appInitializeFail: (state, action: PayloadAction<string>) => {
            state.appInitializeData.isLoading = false;
            state.appInitializeData.error = action.payload;
        },
    }
})

export const {
    loginStart, loginSuccess,
    loginFail, loadProfileStart,
    loadProfileSuccess, loadProfileFail,
    regFail, regSuccess,
    avatarFail, avatarStart,
    regStart, avatarSuccess,
    clearProfileData, setRegisterError, logoutStart, logoutSuccess, logoutFail, appInitializeStart, appInitializeSuccess, appInitializeFail
} = authSlice.actions;

export default authSlice.reducer;