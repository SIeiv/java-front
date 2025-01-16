export interface IGetTimetableItemResponse {
    "id": number,
    "groupName": string,
    "publicationDate": string,
    "moderatorName": string,
    favourite: boolean,
}

export interface IAddTimetable {
    Book: any,
    title: string,
    author: string,
}

export interface IEditTimetableRequest {
    id: number,
    title: string,
    author: string,
    moderatorName: string,
    publicationDate: string,
    file: any
}

export interface IBook {
    "id": number,
    "authorName": string,
    "moderatorName": string,
    "publicationDate": string,
    "title": string,
    "favourite": boolean
}