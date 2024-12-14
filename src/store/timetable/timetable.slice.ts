import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGetTimetableItemResponse} from "@/api/timetable/types.ts";
import api from "@/api";

export const getTimetable = createAsyncThunk(
    "timetable/getTimetable",
    async (_, {rejectWithValue}) => {
        try {
            const timetableResponse = await api.timetable.getTimetable();
            const viewsResponse = await api.timetable.getTimetableViews();

            if (timetableResponse.status !== 200 || viewsResponse.status !== 200) {
                throw new Error("Server error!")
            }

            const data = {
                timetable: JSON.parse(timetableResponse.data),
                viewsCount: JSON.parse(viewsResponse.data)
            }

            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
    );

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
    },

    extraReducers: (builder) => {
        builder.addCase(getTimetable.pending, (state) => {
            state.timetableData.isLoading = true;
        });
        builder.addCase(getTimetable.fulfilled, (state, action) => {
            state.timetableData.timetable = action.payload.timetable;
            state.timetableData.viewsCount = action.payload.viewsCount;
            state.timetableData.isLoading = false;
            state.timetableData.error = null;
        });
        builder.addCase(getTimetable.rejected, (state, action) => {
            state.timetableData.isLoading = false;
            state.timetableData.error = action.payload;
        });
    }


})

export const {
    timetableGetStart, timetableGetSuccess, timetableGetFail,
} = timetableSlice.actions;

export default timetableSlice.reducer;