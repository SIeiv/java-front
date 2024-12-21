import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFavourite} from "@/api/profile/types.ts";
import {IEditTimetableRequest} from "@/api/timetable/types.ts";

const initialState = {
    favourites: {
        data: [] as IFavourite[],
        isLoading: false as boolean,
        error: null as null | string,
    }
}

export const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadfavouritesStart: (state) => {
            state.favourites.isLoading = true;
        },
        loadfavouritesSuccess: (state, action) => {
            state.favourites.data = action.payload;
            state.favourites.isLoading = false;
            state.favourites.error = null;
        },
        loadfavouritesFail: (state, action: PayloadAction<string>) => {
            state.favourites.isLoading = false;
            state.favourites.error = action.payload;
        },

        localAddToFavourites: (state, action: PayloadAction<IFavourite>) => {
            state.favourites.data.push(action.payload);

        },
        localDeleteToFavourites: (state, action: PayloadAction<number>) => {
            state.favourites.data.forEach((item, index) => {
                if (item.id === action.payload) {
                    state.favourites.data.splice(index, 1);
                }
            })
        },

        localEditFavourite: (state, action: PayloadAction<IEditTimetableRequest>) => {
            state.favourites.data.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.groupName = action.payload.groupName;
                }
            })
        },

        resetProfile: () => initialState
    }
})

export const {
    loadfavouritesStart, loadfavouritesSuccess, loadfavouritesFail, localAddToFavourites, localDeleteToFavourites,
    resetProfile, localEditFavourite
} = authSlice.actions;

export default authSlice.reducer;