import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGetTimetableItemResponse} from "@/api/timetable/types.ts";

const initialState = {

    timetableData: {
        timetable: null as null | Array<IGetTimetableItemResponse>,
        isLoading: false as boolean,
        error: null as null | string,
        viewsCount: null as null | number
    }
}

export const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        timetableGetStart: (state) => {
            state.timetableData.isLoading = true;
        },
        timetableGetSuccess: (state, action) => {
            state.timetableData.timetable = action.payload.timetable;
            state.timetableData.viewsCount = action.payload.viewsCount;
            state.timetableData.isLoading = false;
            state.timetableData.error = null;
        },
        timetableGetFail: (state, action: PayloadAction<string>) => {
            state.timetableData.isLoading = false;
            state.timetableData.error = action.payload;
        },
    }
})

export const {
    timetableGetStart, timetableGetSuccess, timetableGetFail,
} = timetableSlice.actions;

export default timetableSlice.reducer;