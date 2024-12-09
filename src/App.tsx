import './App.css'
import Auth from "@/pages/auth/auth.tsx";
import { Routes, Route } from "react-router";
import Lk from "@/pages/lk/lk.tsx";
import Main from "@/pages/main/main.tsx";


function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
                <Route path={"/"} element={<Main/>} />
                <Route path="/auth/*" element={<Auth/>} />
                <Route path="/lk/*" element={<Lk/>} />
            </Routes>
        </div>
    )
}

export default App