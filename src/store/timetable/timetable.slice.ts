import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEditTimetableRequest, IGetTimetableItemResponse} from "@/api/timetable/types.ts";
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

            state.timetableData.viewsCount = action.payload.viewsCount;
            state.timetableData.isLoading = false;
            state.timetableData.error = null;
        },
        timetableGetFail: (state, action: PayloadAction<string>) => {
            state.timetableData.isLoading = false;
            state.timetableData.error = action.payload;
        },

        initSetTimetableFavourite: (state, action: PayloadAction<IFavourite[]>) => {

        },

        localDeleteTimetable: (state, action: PayloadAction<number>) => {
            state.timetableData.timetable!.forEach(((item, index) => {
                if (item.id === action.payload) {
                    state.timetableData.timetable!.splice(index, 1);
                }
            }));
        },

        localAddToFavouritesUpdate: (state, action: PayloadAction<number>) => {
            state.timetableData.timetable!.forEach((item) => {
                if (item.id === action.payload) {
                    item.favourite = true;
                }
            })

        },
        localDeleteToFavouritesUpdate: (state, action: PayloadAction<number>) => {
            state.timetableData.timetable!.forEach((item) => {
                if (item.id === action.payload) {
                    item.favourite = false;
                }
            })
        },

        localEditTimetable: (state, action: PayloadAction<IEditTimetableRequest>) => {
            state.timetableData.timetable!.forEach(timetable => {
                if (timetable.id === action.payload.id) {
                    timetable.publicationDate = action.payload.publicationDate;
                    timetable.groupName = action.payload.groupName;
                    timetable.moderatorName = action.payload.moderatorName;
                }
            })
        },

        resetTimetable: () => initialState
    }
})

export const {
    timetableGetStart, timetableGetSuccess, timetableGetFail, initSetTimetableFavourite,
    localDeleteTimetable, localDeleteToFavouritesUpdate, localAddToFavouritesUpdate, resetTimetable,
    localEditTimetable
} = timetableSlice.actions;

export default timetableSlice.reducer;