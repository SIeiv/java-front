import {Dispatch} from "@reduxjs/toolkit";
import {resetAuth} from "@/store/auth/auth.slice.ts";
import {resetProfile} from "@/store/profile/profile.slice.ts";
import {resetTimetable} from "@/store/timetable/timetable.slice.ts";
import {appInitializeAC} from "@/store/auth/actionCreators.ts";


export const resetAll = () => async (dispatch: Dispatch) => {
    dispatch(resetAuth());
    dispatch(resetProfile());
    dispatch(resetTimetable());
    dispatch(appInitializeAC());
}