import {Dispatch} from "@reduxjs/toolkit";
import api from "../../api";
import {timetableGetFail, timetableGetStart, timetableGetSuccess} from "@/store/timetable/timetable.slice.ts";
import {IAddTimetable} from "@/api/timetable/types.ts";

export const getTimetableAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(timetableGetStart());

        const timetableResponse = await api.timetable.getTimetable();
        const viewsResponse = await api.timetable.getTimetableViews();

        dispatch(timetableGetSuccess({timetable: timetableResponse.data, viewsCount: viewsResponse.data}));
    } catch (e: any) {
        console.error(e);
        dispatch(timetableGetFail(e.message));
    }
}

export const addTimetableAC = (data: IAddTimetable) => async () => {
    const request = await api.timetable.addTimetable({groupName: data.groupName, timetable: data.timetable[0]});
}
