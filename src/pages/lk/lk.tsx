import {Route, Routes, useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {clearProfileData} from "@/store/auth/auth.slice.ts";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {getAllUsers, getAvatarAC, logoutUser, putAvatarAC} from "@/store/auth/actionCreators.ts";
import {Skeleton} from "@/components/ui/skeleton";
import {Input} from "@/components/ui/input.tsx";
import Header from "@/components/header.tsx";
import Loading from "@/components/ui/loading.tsx";
import LkTable from "@/components/lk-table/lk-table.tsx";
import {Label} from "@/components/ui/label.tsx";
import LkNav from "@/pages/lk/lk-nav.tsx";
import {getFavouritesAC} from "@/store/profile/actionCreators.ts";
import {resetAll} from "@/store/commonAC.ts";
import {getTimetableAC} from "@/store/timetable/actionCreators.ts";
import {ILkNavDataType} from "@/types.ts";

const Lk = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const profile = useAppSelector(state => state.auth.profileData.profile);
    const role = useAppSelector(state => state.auth.profileData.role);
    const avatar = useAppSelector(state => state.auth.avatarData.avatar);
    const getAllUsersData = useAppSelector(state => state.auth.getAllUsersData);
    const favourites = useAppSelector(state => state.profile.favourites);
    const timetable = useAppSelector(state => state.timetable.timetableData.timetable);

    const isAvatarLoading = useAppSelector(state => state.auth.avatarData.isLoading);
    const isProfileLoading = useAppSelector(state => state.auth.profileData.isLoading);
    const isLogout = useAppSelector(state => state.auth.logoutData.isLoading);

    const [avatarForm, setAvatarForm] = useState(false);


    const avatarFileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!profile) {
            navigate("/auth/login");
        }
        if (!avatar) dispatch(getAvatarAC());
        dispatch(getAllUsers());
        dispatch(getFavouritesAC());
        if (!timetable) dispatch(getTimetableAC());
    }, [])

    const handleAvatar = async () => {
        await dispatch(putAvatarAC(avatarFileRef.current!.files!));
        dispatch(getAvatarAC());
        setAvatarForm(false);
    }

    const lkNavData: ILkNavDataType[] = role === "ROLE_ADMIN"
        ? [
            {
                text: "Избранное",
                to: "/lk/fav"
            },
            {
                text: "Пользователи",
                to: "/lk/users"
            }
        ]
        : [
            {
                text: "Избранное",
                to: "/lk/fav"
            }
        ]

    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Header/>

            <Loading dependence={isLogout}/>

            <Dialog open={avatarForm} onOpenChange={() => {
                setAvatarForm(false)
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Загрузить аватарку</DialogTitle>
                        <DialogDescription>
                            <Input className={"mt-2"} type="file" ref={avatarFileRef}/>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleAvatar}>Ок</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className={"w-[1248px] h-[535px] mt-3.5 m-auto flex flex-col gap-3.5"}>
                <div className={"text-xl font-medium flex gap-2 bg-white p-2.5 box-border rounded-xl"}>
                    <span>Личный кабинет</span>
                    {role === "ROLE_MODERATOR" &&
                        <span className={"bg-green-600 text-white px-2 rounded-md"}>Moderator</span>}
                    {role === "ROLE_ADMIN" && <span className={"bg-red-600 text-white px-2 rounded-md"}>Admin</span>}
                </div>
                <div className={"flex gap-3.5 w-full h-full "}>
                    <div
                        className={"flex flex-col gap-3.5 items-center justify-center p-2.5 box-border bg-white rounded-xl"}>
                        <Avatar className={"w-48 h-48 text-8xl"}>
                            {!isAvatarLoading
                                ? <div>
                                    <AvatarImage src={avatar}/>
                                    <AvatarFallback
                                        className={"w-48 h-full pb-5"}>{profile ? profile.username[0] : "U"}</AvatarFallback>
                                </div>
                                : <Skeleton className="w-full h-full"/>
                            }
                        </Avatar>
                        <div className={"text-xl"}>
                            {!isProfileLoading
                                ? <div>
                                    <div>username: {profile ? profile.username : "unknown username"}</div>
                                    <div>email: {profile ? profile.email : "unknown email"}</div>
                                </div>
                                : <div>
                                    <Skeleton className="w-36 h-[56px]"/>
                                </div>
                            }

                        </div>
                        <div className={"flex flex-col w-full justify-center gap-1"}>
                            <Button onClick={() => {
                                setAvatarForm(true)
                            }}>Загрузить аватарку</Button>
                            <Button className={"bg-red-600 hover:bg-red-500"} onClick={async () => {
                                await dispatch(logoutUser());
                                dispatch(resetAll());
                                if (!isLogout) {
                                    navigate("/auth/login");
                                }

                            }}>Выйти</Button>
                        </div>
                    </div>
                    <div className={"flex flex-col items-start w-full p-2.5 box-border bg-white rounded-xl"}>
                        <LkNav data={lkNavData}/>
                        <div>

                        </div>
                        <Routes>
                            <Route path="users" element={
                                <div
                                    className={"flex flex-col items-start w-full p-2.5 box-border bg-white rounded-xl"}>
                                    <div className={"flex justify-between px-3"}>
                                        <Label className={"w-[50px] h-10 flex items-center"}>Id</Label>
                                        <Label className={"w-[200px] h-10 flex items-center"}>Username</Label>
                                        <Label className={"w-[200px] h-10 flex items-center"}>Email</Label>
                                        <Label className={"w-[188px] h-10 flex items-center"}>Роль</Label>
                                        <div className={"w-[140px] h-10"}></div>
                                    </div>
                                    <div className={"overflow-auto max-h-[350px] box-border"}>
                                        <LkTable loading={false} data={getAllUsersData.allUsers}/>
                                    </div>
                                </div>
                            }/>
                            <Route path="fav" element={
                                <div
                                    className={"flex flex-col items-start p-2.5 box-border bg-white rounded-xl w-full"}>
                                    <div className={"flex px-3 w-full"}>
                                        <Label className={"w-[50px] h-10 flex items-center"}>№</Label>
                                        <Label className={"w-[200px] h-10 flex items-center"}>Название группы</Label>
                                        <Label className={"w-[200px] h-10 flex items-center"}>Дата публикации</Label>
                                        <Label className={"w-[188px] h-10 flex items-center"}>Автор публикации</Label>
                                        <div className={"w-[188px] h-10"}></div>
                                    </div>
                                    <div className={"overflow-auto h-[350px] box-border w-full"}>
                                        <LkTable loading={false} data={favourites.data} type={"favourites"}/>
                                    </div>
                                </div>
                            }/>
                        </Routes>


                    </div>

                </div>
            </div>
        </div>

    );
};

export default Lk;