export interface IGetTimetableItemResponse {
    "id": number,
    "groupName": string,
    "publicationDate": string,
    "moderatorName": string,
    isFavourite: boolean,
}

export interface IAddTimetable {
    timetable: any,
    groupname: string,
}