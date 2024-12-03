import Register from "@/pages/auth/register.tsx";
import Login from "@/pages/auth/login.tsx";
import { Routes, Route } from "react-router";

const Auth = () => {
    return (
        <div className={"w-full h-full"}>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
};

export default Auth;