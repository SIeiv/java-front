export interface IGetTimetableItemResponse {
    "id": number,
    "groupName": string,
    "publicationDate": string,
    "moderatorName": string
}

export interface IAddTimetable {
    timetable: any,
    groupname: string,
}