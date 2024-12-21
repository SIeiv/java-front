import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";
import {
    loadfavouritesFail,
    loadfavouritesStart,
    loadfavouritesSuccess,
    localAddToFavourites, localDeleteToFavourites
} from "@/store/profile/profile.slice.ts";
import {store} from "@/store";
import {
    initSetTimetableFavourite,
    localAddToFavouritesUpdate,
    localDeleteToFavouritesUpdate
} from "@/store/timetable/timetable.slice.ts";

export const getFavouritesAC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(loadfavouritesStart());

        const response = await api.profile.getFavourites();

        dispatch(initSetTimetableFavourite(response.data));
        dispatch(loadfavouritesSuccess(response.data));
    } catch (e: any) {
        console.error(e);
        dispatch(loadfavouritesFail(e.message));
    }
}

export const addToFavoritesAC = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(localAddToFavouritesUpdate(id));
        const request = await api.profile.addFavourite({timetable_id: id});

        if (request.status === 200) {
            const timetable = store.getState().timetable.timetableData.timetable;
            timetable!.forEach(item => {
                if (item.id === id) {
                    dispatch(localAddToFavourites(item));
                }
            })
        }
    } catch (error) {
        console.error(error);
    }

}

export const deleteFromFavoritesAC = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(localDeleteToFavouritesUpdate(id));
        dispatch(localDeleteToFavourites(id));
        const request = await api.profile.deleteFavourite({timetable_id: id});

        /*if (request.status === 200) {

        }*/
    } catch (error) {
        console.error(error);
    }

}