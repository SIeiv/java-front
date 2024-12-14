import {FC} from "react";
import {IUser} from "@/api/profile/types.ts";

const LkTableItem: FC<IUser> = ({id, username, email, roles}) => {

    return (
        <div className={"flex items-center justify-between rounded-xl px-3 shadow h-10"}>
            <div className={"w-[188px]"}>{id}</div>
            <div className={"w-[200px]"}>{username}</div>
            <div className={"w-[200px]"}>{email}</div>
            <div className={"w-[188px]"}>{roles}</div>
            <div className={"w-[140px] flex items-center justify-center"}>

            </div>
        </div>
    );
};

export default LkTableItem;