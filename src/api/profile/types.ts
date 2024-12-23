export interface IProfileResponse {
    "email": string,
    "username": string,
}

export type UserRolesType = "ROLE_ADMIN" | "ROLE_MODERATOR" | "ROLE_USER"

export interface IUser {
    id: number,
    username: string,
    email: string,
    roles: UserRolesType,
}

export interface IFavourite {
    id: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
}

export interface IUpdateUserRequest extends IUser {
    profilePicture: string | null;
    password: string | null;
}

export interface IDeleteUserRequest {
    id: number
}

export interface IAddUserRequest extends IUpdateUserRequest {

}
