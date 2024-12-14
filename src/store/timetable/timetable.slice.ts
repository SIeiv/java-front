import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGetTimetableItemResponse} from "@/api/timetable/types.ts";
import {IFavourite} from "@/api/profile/types.ts";

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

            state.timetableData.timetable!.forEach(item => {
                item.isFavourite = false;
            })

            state.timetableData.viewsCount = action.payload.viewsCount;
            state.timetableData.isLoading = false;
            state.timetableData.error = null;
        },
        timetableGetFail: (state, action: PayloadAction<string>) => {
            state.timetableData.isLoading = false;
            state.timetableData.error = action.payload;
        },

        initSetTimetableFavourite: (state, action: PayloadAction<IFavourite[]>) => {
            state.timetableData.timetable!.forEach(item => {
                action.payload.forEach(item2 => {
                    if (item.id === item2.id) {
                        item.isFavourite = true;
                    }
                })
            })
        },

        localDeleteTimetable: (state, action: PayloadAction<number>) => {
            state.timetableData.timetable!.forEach(((item, index) => {
                if (item.id === action.payload) {
                    state.timetableData.timetable!.splice(index, 1);
                }
            }));
        }
    }
})

export const {
    timetableGetStart, timetableGetSuccess, timetableGetFail, initSetTimetableFavourite, localDeleteTimetable
} = timetableSlice.actions;

export default timetableSlice.reducer;