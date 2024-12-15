export interface IProfileResponse {
    "email": string,
    "username": string,
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    roles: "ROLE_ADMIN" | "ROLE_MODERATOR" | "ROLE_USER",
}

export interface IFavourite {
    id: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
}

export interface IUpdateUserRequest extends IUser {
    profilePicture: null;
    password: string | null;
}
