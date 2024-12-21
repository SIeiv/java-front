import {FC, useRef, useState} from "react";
import {IUpdateUserRequest, IUser} from "@/api/profile/types.ts";
import {Button} from "@/components/ui/button.tsx";
import TimetableControlButtons from "@/components/timetable/timetable-control-buttons.tsx";
import {PenLine} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ComboboxDemo} from "@/components/ui/combobox-demo.tsx";
import {useAppDispatch} from "@/hooks.ts";
import {updateUserAC} from "@/store/auth/actionCreators.ts";

interface ILkTableItem extends IUser {
    type?: "users" | "favourites";
    isFavorite: boolean;
}

const LkTableItem: FC<ILkTableItem> = ({id, username, email, roles, type, isFavorite}) => {
    const dispatch = useAppDispatch();

    const [editUserForm, setEditUserForm] = useState(false);
    const [editRole, setEditRole] = useState(roles);
    const [editEmail, setEditEmail] = useState(email);
    const [editUsername, setEditUsername] = useState(username);
    const [editPassword, setEditPassword] = useState("");
    const avatarRef = useRef<HTMLInputElement>(null);
    const handleEditUser = async () => {

        const reader = new FileReader();
        reader.readAsDataURL(avatarRef.current!.files![0]);
        reader.onload = function () {
            const profilePicture = reader.result!.toString().replace("data:image/jpeg;base64,", "");

            const data: IUpdateUserRequest = {
                id,
                roles: editRole,
                username: editUsername,
                email: editEmail,
                password: editPassword,
                profilePicture: profilePicture ? profilePicture : null
            }

            dispatch(updateUserAC(data));
            setEditUserForm(false);
        };
    }

    return (
        <div className={"flex items-center rounded-xl px-3 shadow h-10 w-full"}>

            <Dialog open={editUserForm} onOpenChange={() => {setEditUserForm(false)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"mb-2"}>Изменить пользователя</DialogTitle>
                        <DialogDescription className={"flex flex-col gap-3"}>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Имя пользователя</Label>
                                <Input value={editUsername} onChange={(e) => {
                                    setEditUsername(e.target.value)
                                }}></Input>
                            </div>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Email</Label>
                                <Input value={editEmail} onChange={(e) => {
                                    setEditEmail(e.target.value)
                                }}></Input>
                            </div>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Роль</Label>
                                <ComboboxDemo role={editRole} setEditRole={setEditRole}/>
                            </div>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Аватарка</Label>
                                <Input type={"file"} ref={avatarRef}></Input>
                            </div>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Пароль</Label>
                                <Input value={editPassword} onChange={(e) => {
                                    setEditPassword(e.target.value)
                                }}></Input>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleEditUser}>Изменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className={"w-[50px]"}>{id}</div>
            <div className={"w-[200px]"}>{username}</div>
            <div className={"w-[200px]"}>{email}</div>
            <div className={"w-[188px]"}>{roles}</div>
            <div className={"w-[255px] flex items-center justify-center"}>
                {type === "favourites"
                    && <div className={"flex items-center justify-center"}>
                        <Button variant={"ghost"} className={""}>
                            <a href={`http://localhost:8080/api/timetable/download?id=${id}`}>Скачать</a>
                        </Button>
                        <TimetableControlButtons isFavorite={true} num={id} groupName={username} publicationDate={email} moderatorName={roles}/>
                    </div>
                }
                {type === "users"
                    && <div className={"flex items-center justify-center"}>
                        <Button variant={"ghost"} className={""} onClick={() => {setEditUserForm(true)}}>
                            <PenLine/>
                        </Button>
                    </div>
                }

            </div>
        </div>
    );
};

export default LkTableItem;