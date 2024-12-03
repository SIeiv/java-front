import styles from "./lk.module.css";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {clearAccessToken} from "@/store/auth/auth.slice.ts";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const Lk = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const accessToken = useAppSelector(state => state.auth.authData.accessToken);
    const profile = useAppSelector(state => state.auth.profileData.profile);

    const [avatarForm, setAvatarForm] = useState(true);

    useEffect(() => {
        if (!accessToken) {
            navigate("/auth/login");
        }
    }, [accessToken]);

    return (
        <div className={"flex items-center justify-center w-full h-full bg-slate-50"}>

            <Dialog open={avatarForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Загрузить аватарку</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Ок</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className={"lk__main bg-white rounded-2xl box-border p-2.5"}>
                <div className={"text-xl font-medium"}>Личный кабинет</div>
                <div className={"flex items-center justify-center flex-col gap-3.5 w-full h-full"}>
                    <Avatar className={"w-48 h-48 text-8xl"}>
                        <AvatarImage src=""/>
                        <AvatarFallback className={"w-48 h-full pb-5"}>{profile ? profile.username[0] : "U"}</AvatarFallback>
                    </Avatar>
                    <div className={"text-xl"}>
                        <div>username: {profile ? profile.username : "unknown username"}</div>
                        <div>email: {profile ? profile.email : "unknown email"}</div>
                    </div>
                    <div className={"flex items-center justify-center gap-1"}>
                        <Button>Загрузить аватарку</Button>
                        <Button className={"bg-red-600 hover:bg-red-500"} onClick={() => {
                            dispatch(clearAccessToken())
                        }}>Выйти</Button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Lk;