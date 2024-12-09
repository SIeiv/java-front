import Header from "@/components/header.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {getTimetableAC} from "@/store/timetable/actionCreators.ts";
import Timetable from "@/components/timetable/timetable.tsx";
import {getAvatarAC} from "@/store/auth/actionCreators.ts";


const Main = () => {
    const dispatch = useAppDispatch();

    const isTimetableLoading = useAppSelector(state => state.timetable.timetableData.isLoading);
    const avatar = useAppSelector(state => state.auth.avatarData.avatar);

    useEffect(() => {
        dispatch(getTimetableAC());
        if (!avatar) dispatch(getAvatarAC());
    }, [])

    return (
        <div>
            <Header />

            <div className={"w-[1248px] min-h-[600px] mt-[48px] bg-white rounded-2xl box-border p-2.5 m-auto"}>
                <div className={"text-xl font-medium"}>Расписание занятий</div>
                <Timetable loading={isTimetableLoading}/>
            </div>
        </div>
    );
};

export default Main;