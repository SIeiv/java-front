import {FC, useState} from "react";
import {IUser} from "@/api/profile/types.ts";
import {Button} from "@/components/ui/button.tsx";
import TimetableControlButtons from "@/components/library/timetable-control-buttons.tsx";
import {PenLine, Smile, Trash2} from "lucide-react";

import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {deleteUserAC} from "@/store/auth/actionCreators.ts";
import LkUserInteraction from "@/components/forms/lk-user-interaction.tsx";
import {Label} from "@/components/ui/label.tsx";

interface ILkTableItem extends IUser {
    type?: "users" | "favourites";
    isFavorite: boolean;

    username2: string;
}

const LkTableItem: FC<ILkTableItem> = ({id, username, username2, email, roles, type}) => {
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector(state => state.auth.profileData.id);

    const [editUserForm, setEditUserForm] = useState(false);

    return (
        <div className={"flex items-center rounded-xl px-3 shadow h-10 w-full"}>

            <LkUserInteraction formState={editUserForm} setFormState={setEditUserForm} type={"edit"} user={{
                id, username, email, roles
            }}/>

            <div className={"w-[50px]"}>{id}</div>
            <div className={"w-[225px]"}>{username}</div>
            <div className={type === "users" ? "" : "w-[225px]"}>{username2}</div>
            <div className={"w-[225px]"}>{email}</div>
            <div className={"w-[188px]"}>{roles}</div>
            <div className={"w-[255px] flex items-center justify-center"}>
                {type === "favourites"
                    && <div className={"flex items-center justify-center"}>
                        <Button variant={"ghost"} className={""}>
                            <a href={`http://localhost:8080/api/timetable/download?id=${id}`}>Скачать</a>
                        </Button>
                        <TimetableControlButtons isFavorite={true} num={id} title={username} author={username2} publicationDate={email} moderatorName={roles}/>
                    </div>
                }
                {type === "users"
                    && <div className={"flex items-center justify-center"}>
                        {id === currentUserId
                            ? <Label className={"flex items-center gap-1"}>Это Вы. Вы прекрасны! <Smile /></Label>
                            : <div>
                                <Button variant={"ghost"} className={""} onClick={() => {setEditUserForm(true)}}>
                                    <PenLine/>
                                </Button>
                                <Button variant={"ghost"} onClick={() => {
                                    dispatch(deleteUserAC({id}))
                                }}>
                                    <Trash2/>
                                </Button>
                            </div>
                        }

                    </div>
                }

            </div>
        </div>
    );
};

export default LkTableItem;