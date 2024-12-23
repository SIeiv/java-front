import {UserRolesType} from "@/api/profile/types.ts";

export interface ILoginRequest {
    "email": string,
    "password": string,
}

export interface IRegisterRequest {
    "email": string,
    "password": string,
    "username": string,
}

export interface IGetProfileResponse {
    0: number;
    1: string;
    2: Array<{authority: UserRolesType}>;
}