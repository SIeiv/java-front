export interface IGetTimetableItemResponse {
    "id": number,
    "groupName": string,
    "publicationDate": string,
    "moderatorName": string,
    favourite: boolean,
}

export interface IAddTimetable {
    timetable: any,
    groupname: string,
}

export interface IEditTimetableRequest {
    id: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
    file?: string
}