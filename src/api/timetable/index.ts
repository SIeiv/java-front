import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";

export const getTimetable = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.TIMETABLE.GET_TIMETABLES);