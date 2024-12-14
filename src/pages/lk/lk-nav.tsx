import LkNavItem from "@/pages/lk/lk-nav-item.tsx";

const LkNav = () => {
    return (
        <div className={" h-10 border rounded-md flex items-center justify-center text-sm font-medium p-1"}>
            <LkNavItem text={"Избранное"} to={"/lk/fav"}/>
            <LkNavItem text={"Пользователи"} to={"/lk/users"}/>
        </div>
    );
};

export default LkNav;