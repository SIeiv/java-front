export interface IProfileResponse {
    "email": string,
    "username": string,
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    roles: string
}

export interface IFavourite {
    id: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
}
