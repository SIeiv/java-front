import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {IAddTimetable} from "@/api/timetable/types.ts";

export const getTimetable = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.TIMETABLE.GET_TIMETABLES);

export const getTimetableViews = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.TIMETABLE.GET_VIEWS);

export const addTimetable = (params: IAddTimetable) =>
    axiosInstance.put(endpoints.TIMETABLE.ADD_TIMETABLE, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const deleteTimetable = (params: {id: number}) =>
    axiosInstance.delete(endpoints.TIMETABLE.DELETE_TIMETABLE, {data: params, headers: {
            "Content-Type": "multipart/form-data"
        }});