import LkNavItem from "@/pages/lk/lk-nav-item.tsx";
import {ILkNavDataType} from "@/types.ts";
import {FC, ReactElement} from "react";

interface ILkNavProps {
    data: ILkNavDataType[]
}

const LkNav: FC<ILkNavProps> = ({data}) => {
    const LkNavItems: ReactElement[] = data.map(item =>
        <LkNavItem text={item.text} to={item.to}/>
    )

    return (
        <div className={" h-10 border rounded-md flex items-center justify-center text-sm font-medium p-1"}>
            {LkNavItems}
        </div>
    );
};

export default LkNav;