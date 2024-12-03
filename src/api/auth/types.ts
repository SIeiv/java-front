export interface ILoginRequest {
    "email": string,
    "password": string,
}

export interface IRegisterRequest {
    "email": string,
    "password": string,
    "username": string,
}

export interface IProfileResponse {
    "email": string,
    "username": string,
}