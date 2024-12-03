import styles from "./lk.module.css";
import {useNavigate} from "react-router";
import {useAppSelector} from "@/hooks.ts";
import {useEffect} from "react";

import defaultUser from "@/assets/default_user.jpg";

const Lk = () => {
    const navigate = useNavigate();

    const accessToken = useAppSelector(state => state.auth.authData.accessToken);

    const profile = useAppSelector(state => state.auth.profileData.profile);

    useEffect(() => {
        if (!accessToken) {
            navigate("/auth/login");
        }
    }, [accessToken]);

    return (
        <div className={"flex items-center justify-center w-full h-full bg-slate-50"}>
            <div className={"lk__main bg-white rounded-2xl box-border p-2.5"}>
                <div className={"text-xl font-medium"}>Личный кабинет</div>
                <div className={"flex items-center justify-center flex-col gap-3.5 w-full h-full"}>
                    <div>
                        <img className={"w-64 rounded-full"} src={defaultUser} alt=""/>
                    </div>
                    <div className={"text-xl"}>
                        <div>username: {profile ? profile.username : "unknown username"}</div>
                        <div>email: {profile ? profile.email : "unknown email"}</div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Lk;