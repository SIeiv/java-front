import {NavLink} from "react-router";
import {FC} from "react";

interface WriterNavItemProps {
    text: string;
    to: string
}

const LkNavItem: FC<WriterNavItemProps> = ({to, text}) => {
    return (
        <NavLink className={({isActive}) =>
            isActive
                ? "bg-slate-100 px-3 h-8 py-2 flex items-center rounded-md"
                : "bg-transparent px-3 h-8 py-2 flex items-center rounded-md"}
                 to={to}>
            {text}
        </NavLink>
    );
};

export default LkNavItem;