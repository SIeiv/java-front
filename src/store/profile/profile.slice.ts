import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFavourite} from "@/api/profile/types.ts";

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
            state.favourites.data.filter(item => item.id !== action.payload)
        }
    }
})

export const {
    loadfavouritesStart, loadfavouritesSuccess, loadfavouritesFail, localAddToFavourites, localDeleteToFavourites
} = authSlice.actions;

export default authSlice.reducer;