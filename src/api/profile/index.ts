import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {IAddUserRequest, IDeleteUserRequest, IFavourite, IUpdateUserRequest, IUser} from "@/api/profile/types.ts";

export const getProfile = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE);

export const putAvatar = (params: any) =>
    axiosInstance.put(endpoints.PROFILE.PUT_AVATAR, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
});

export const getAvatar = () =>
    axiosInstance.get(endpoints.PROFILE.GET_PICTURE, {
        responseType: "blob"
    });

export const getCurrentUser = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.PROFILE.CURRENT_USER);

export const getAllUsers = (): AxiosPromise<IUser[]> =>
    axiosInstance.get(endpoints.PROFILE.GET_ALL_USERS);

export const getFavourites = (): AxiosPromise<IFavourite[]> =>
    axiosInstance.get(endpoints.PROFILE.GET_FAVOURITES);

export const updateUser = (params: IUpdateUserRequest): AxiosPromise<IFavourite[]> =>
    axiosInstance.put(endpoints.PROFILE.UPDATE_USER, params, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const deleteUser = (params: IDeleteUserRequest): AxiosPromise<IFavourite[]> =>
    axiosInstance.delete(endpoints.PROFILE.DELETE_USER, {data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }});

export const addUser = (params: IAddUserRequest): AxiosPromise<IFavourite[]> =>
    axiosInstance.post(endpoints.PROFILE.ADD_USER, params, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const addFavourite = (params: {book_id: number}) =>
    axiosInstance.put(endpoints.PROFILE.ADD_FAVOURITE, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const deleteFavourite = (params: {book_id: number}) =>
    axiosInstance.delete(endpoints.PROFILE.DELETE_FAVOURITE, {data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }});