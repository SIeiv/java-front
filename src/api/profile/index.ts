import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {IFavourite, IUser} from "@/api/profile/types.ts";

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

export const addFavourite = (params: {timetable_id: number}) =>
    axiosInstance.put(endpoints.PROFILE.ADD_FAVOURITE, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const deleteFavourite = (params: {timetable_id: number}) =>
    axiosInstance.delete(endpoints.PROFILE.ADD_FAVOURITE, {data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }});