import Header from "@/components/header.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {getTimetableAC} from "@/store/timetable/actionCreators.ts";
import Library from "@/components/library/library.tsx";
import {getAvatarAC} from "@/store/auth/actionCreators.ts";
import {Label} from "@/components/ui/label.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {getFavouritesAC} from "@/store/profile/actionCreators.ts";


const Main = () => {
    const dispatch = useAppDispatch();

    const isTimetableLoading = useAppSelector(state => state.timetable.timetableData.isLoading);
    const timetable = useAppSelector(state => state.timetable.timetableData.timetable);
    const avatar = useAppSelector(state => state.auth.avatarData.avatar);
    const viewsCount = useAppSelector(state => state.timetable.timetableData.viewsCount);


    useEffect(() => {
        if (!timetable) dispatch(getTimetableAC());
        if (!avatar) dispatch(getAvatarAC());
        dispatch(getFavouritesAC());
    }, [])

    return (
        <div>
            <Header />

            <div className={"w-[1248px] min-h-[600px] mt-[48px] bg-white rounded-2xl box-border p-2.5 m-auto"}>
                <div className={"text-xl font-medium flex justify-between items-center w-full"}>
                    <span>Список книг</span>
                    {
                        viewsCount ? <Label className={"text-slate-400"}>{viewsCount} просмотров</Label> : <Skeleton className={"h-6 w-28"}/>
                    }
                </div>
                <Library loading={isTimetableLoading}/>

            </div>
        </div>
    );
};

export default Main;