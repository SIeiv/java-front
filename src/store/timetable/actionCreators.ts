import {Dispatch} from "@reduxjs/toolkit";
import api from "../../api";
import {timetableGetFail, timetableGetStart, timetableGetSuccess} from "@/store/timetable/timetable.slice.ts";

export const getTimetableAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(timetableGetStart());

        const response = await api.timetable.getTimetable();

        dispatch(timetableGetSuccess(response.data));
    } catch (e: any) {
        console.error(e);
        dispatch(timetableGetFail(e.message));
    }
}
