import { axiosInstance } from "@/api/instance.ts";
import {ILoginRequest, IRegisterRequest} from "@/api/auth/types.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";

export const login = (params: ILoginRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise<string> =>
    axiosInstance.post(endpoints.AUTH.LOGOUT);

export const register = (params: IRegisterRequest) =>
    axiosInstance.post(endpoints.AUTH.REGISTER, params);