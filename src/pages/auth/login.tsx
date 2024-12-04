import styles from "@/pages/auth/auth.module.css";
import {Label} from "@/components/ui/label.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "@/store/auth/actionCreators.ts";
import {useAppSelector} from "@/hooks.ts";
import loadingGif from "@/assets/bouncing-circles.svg";

import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useAppSelector(state => state.auth.authData.accessToken);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoginning, setIsLoginning] = useState(false);
    const isLoginLoading = useAppSelector(state => state.auth.authData.isLoading);

    useEffect(() => {
        if (accessToken) {
            navigate("/lk");
        }
    }, [accessToken]);

    const handleSubmit = () => {
        setIsLoginning(true);
        dispatch(loginUser({email, password}));
    };

    return (
        <div className={"bg-slate-50 w-full h-full flex items-center justify-center"}>

            <AlertDialog open={isLoginning && isLoginLoading}>
                <AlertDialogContent className={"w-20 h-20 p-1"}>
                    <img src={loadingGif} alt=""/>
                </AlertDialogContent>
            </AlertDialog>

            <div className={styles.registerbox + " bg-white rounded-2xl flex flex-col gap-2.5"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Войти</Label>
                </div>
                <div className={"flex flex-col gap-1.5"}>
                    <AuthInput title={"Почта"} placeholder={"Введите почту"} value={email} onChange={setEmail}/>
                    <AuthInput title={"Пароль"} placeholder={"Введите пароль"} value={password} onChange={setPassword}/>
                </div>
                <div>
                    <Button onClick={handleSubmit} className={"w-full h-10"}>Войти</Button>
                </div>
                <div>
                    Нет аккаунта? <NavLink className={"text-indigo-500"} to={"/auth/register"}>Создать аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;