import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {PenLine, Star, Trash2} from "lucide-react";
import {useAppSelector} from "@/hooks.ts";
import {IUser} from "@/api/profile/types.ts";

const LkTableItem: FC<IUser> = ({id, username, email, roles}) => {
    const profileData = useAppSelector(state => state.auth.profileData);

    return (
        <div className={"flex items-center justify-center rounded-xl px-3 shadow h-10"}>
            <div className={"w-[188px]"}>{id}</div>
            <div className={"w-[200px]"}>{username}</div>
            <div className={"w-[200px]"}>{email}</div>
            <div className={"w-[188px]"}>{roles}</div>
            <div className={"w-[188px] flex items-center justify-center"}>

            </div>
        </div>
    );
};

export default LkTableItem;