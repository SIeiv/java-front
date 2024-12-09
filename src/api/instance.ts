import axios from "axios";
import endpoints from "@/api/endpoints.ts";
import {store} from "@/store";
import {getAccessToken} from "@/store/auth/actionCreators.ts";

export const  axiosInstance = axios.create({});

const urlsSkipAuth = [endpoints.AUTH.LOGIN];

axiosInstance.interceptors.request.use(async (config) => {
    config.withCredentials = true;
    /*config.headers.contentType = "application/json";*/

    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config;
    }

    const accessToken = store.dispatch(getAccessToken());

    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
})