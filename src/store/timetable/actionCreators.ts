import {Dispatch} from "@reduxjs/toolkit";
import api from "../../api";
import {
    localDeleteTimetable, localEditTimetable,
    timetableGetFail,
    timetableGetStart,
    timetableGetSuccess
} from "@/store/timetable/timetable.slice.ts";
import {IAddTimetable, IEditTimetableRequest} from "@/api/library/types.ts";
import {localDeleteToFavourites, localEditFavourite} from "@/store/profile/profile.slice.ts";
import {editTimetable} from "@/api/library";

export const getTimetableAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(timetableGetStart());

        const timetableResponse = await api.library.getAllBooks();
        const viewsResponse = await api.library.getViews();

        dispatch(timetableGetSuccess({timetable: timetableResponse.data, viewsCount: viewsResponse.data}));
    } catch (e: any) {
        console.error(e);
        dispatch(timetableGetFail(e.message));
    }
}

export const addTimetableAC = (data: IAddTimetable) => async () => {
    const params: IAddTimetable = {author: data.author, Book: data.Book[0], title: data.title};
    console.log(params);
    await api.library.addTimetable(params);
}

export const deleteTimetableAC = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(localDeleteTimetable(id));
        dispatch(localDeleteToFavourites(id));
        await api.library.deleteTimetable({id});

        /*if (timetableResponse.status === 200) {

        }*/
    } catch (e: any) {
        console.error(e);
    }
}

export const editTimetableAC = (data: IEditTimetableRequest) => async (dispatch: Dispatch) => {
    try {
        const timetableResponse = await api.library.editTimetable(data);

        if (timetableResponse.status === 200) {
            dispatch(localEditTimetable(data));
            dispatch(localEditFavourite(data));
        }
    } catch (e: any) {
        console.error(e);
    }
}
