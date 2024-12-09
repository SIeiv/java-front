import {ILoginRequest, IRegisterRequest} from "@/api/auth/types.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {
    appInitializeFail,
    appInitializeStart, appInitializeSuccess,
    avatarFail,
    avatarStart,
    avatarSuccess, loadProfileFail,
    loadProfileStart,
    loadProfileSuccess,
    loginFail,
    loginStart,
    loginSuccess, logoutFail, logoutStart, logoutSuccess, regFail,
    regStart, regSuccess
} from "@/store/auth/auth.slice.ts";
import api from "../../api";
import {store} from "@/store";


export const loginUser =
    (data: ILoginRequest) => async (dispatch: Dispatch) => {
        try {
            dispatch(loginStart());

            const response = await api.auth.login(data);

            console.log(response);
            await dispatch(getProfile());
            dispatch(loginSuccess(response.data));

        } catch (e: any) {
            console.error(e);
            dispatch(loginFail(e.response ? e.response.data : e.message));
        }
    }

export const appInitializeAC =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(appInitializeStart());

            await dispatch(getProfile());

            dispatch(appInitializeSuccess());
        } catch (e: any) {
            console.error(e);
            dispatch(appInitializeFail(e.response ? e.response.data : e.message));
        }
    }

export const logoutUser =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(logoutStart());

            const response = await api.auth.logout();

            console.log(response);
            dispatch(logoutSuccess());

        } catch (e: any) {
            console.error(e);
            dispatch(logoutFail(e.response ? e.response.data : e.message));
        }
    }

export const registerUser = (data: IRegisterRequest) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch(regStart());

        const response = await api.auth.register(data);

        console.log(response);
        dispatch(regSuccess());
    } catch (e: any) {
        console.error(e);
        dispatch(regFail(e.response ? e.response.data : e.message));
    }
}

export const getProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadProfileStart());

        const response = await api.profile.getProfile();

        dispatch(loadProfileSuccess(response.data));
    } catch (e: any) {
        console.error(e);
        dispatch(loadProfileFail(e.message));
    }
}

export const getAccessToken = () => (): string | null => {
    try {
        const accessToken = store.getState().auth.authData.accessToken;
        return accessToken;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const putAvatarAC = (data: FileList) => async () => {
    const request = await api.profile.putAvatar({picture: data[0]});
}

export const getAvatarAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(avatarStart());
        const response = await api.profile.getAvatar();
        const imageUrl = URL.createObjectURL(response.data);

        dispatch(avatarSuccess(imageUrl));
    } catch (e: any) {
        console.error(e)
        dispatch(avatarFail(e.message));
    }

}
