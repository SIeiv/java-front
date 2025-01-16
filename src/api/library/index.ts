import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {IAddTimetable, IBook, IEditTimetableRequest} from "@/api/library/types.ts";

export const getAllBooks = (): AxiosPromise<IBook[]> =>
    axiosInstance.get(endpoints.LIBRARY.GET_ALL_BOOKS);

export const getViews = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.LIBRARY.GET_VIEWS);

export const addTimetable = (params: IAddTimetable) =>
    axiosInstance.put(endpoints.LIBRARY.ADD_BOOK, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const deleteTimetable = (params: {id: number}) =>
    axiosInstance.delete(endpoints.LIBRARY.DELETE_BOOK, {data: params, headers: {
            "Content-Type": "multipart/form-data"
        }});

export const editTimetable = (params: IEditTimetableRequest) =>
    axiosInstance.put(endpoints.LIBRARY.UPDATE_TIMETABLE, params);