import {ILoginRequest, IRegisterRequest} from "@/api/auth/types.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {
    avatarFail,
    avatarStart,
    avatarSuccess,
    loadProfileStart,
    loadProfileSuccess,
    loginFail,
    loginStart,
    loginSuccess, regFail,
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
            dispatch(loginSuccess(response.data));
            dispatch(getProfile());
            dispatch(getAvatarAC());

        } catch (e: any) {
            console.error(e);
            dispatch(loginFail(e.message));
        }
    }

export const registerUser = (data: IRegisterRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(regStart());

        const response = await api.auth.register(data);

        console.log(response);
        dispatch(regSuccess());
    } catch (e: any) {
        console.error(e);
        dispatch(regFail(e.message));
    }
}

export const getProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadProfileStart());

        const response = await api.auth.getProfile();

        dispatch(loadProfileSuccess(response.data));
    } catch (e) {
        console.error(e);
        dispatch(loginFail(e.message));
    }
}

export const getAccessToken = () => (dispatch: Dispatch): string | null => {
    try {
        const accessToken = store.getState().auth.authData.accessToken;
        return accessToken;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const putAvatarAC = (data: FileList) => async (dispatch: Dispatch) => {
    const request = await api.auth.putAvatar({picture: data[0]});
}

export const getAvatarAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(avatarStart());
        const response = await api.auth.getAvatar();
        const imageUrl = URL.createObjectURL(response.data);

        dispatch(avatarSuccess(imageUrl));
    } catch (e: any) {
        console.error(e)
        dispatch(avatarFail(e.message));
    }

}
