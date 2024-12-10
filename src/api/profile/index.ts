import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";

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