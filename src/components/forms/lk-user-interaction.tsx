import {FC, useRef, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ComboboxDemo} from "@/components/ui/combobox-demo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IUpdateUserRequest, IUser, UserRolesType} from "@/api/profile/types.ts";
import {addUserAC, updateUserAC} from "@/store/auth/actionCreators.ts";
import {useAppDispatch} from "@/hooks.ts";

interface ILkUserInteractionProps {
    formState: boolean;
    setFormState: (state: boolean) => void;
    type: "edit" | "add";
    user?: IUser;
}

const LkUserInteraction: FC<ILkUserInteractionProps> = ({setFormState, formState, user, type}) => {
    const dispatch = useAppDispatch();

    const [editRole, setEditRole] = useState<UserRolesType>(user ? user.roles : "ROLE_USER");
    const [editEmail, setEditEmail] = useState(user ? user.email : "");
    const [editUsername, setEditUsername] = useState(user ? user.username : "");
    const [editPassword, setEditPassword] = useState("");
    const avatarRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");

    const handleEditUser = async () => {

        const he = (profilePicture: string | null) => {
            const data: IUpdateUserRequest = {
                id: user ? user.id : -1,
                roles: editRole,
                username: editUsername,
                email: editEmail,
                password: editPassword,
                profilePicture: profilePicture
            }

            if (editEmail === "" || editUsername === "" || editPassword === "") {
                setError("Поля заполнены некорректно")
            } else {
                if (type === "edit") {
                    dispatch(updateUserAC(data));
                } else {
                    dispatch(addUserAC(data));
                }

                setFormState(false);
                setEditEmail("");
                setEditUsername("");
                setEditPassword("");
                setError("");
            }
        }

        if (avatarRef.current!.files!.length) {
            const reader = new FileReader();
            reader.readAsDataURL(avatarRef.current!.files![0]);
            reader.onload = function () {
                const profilePicture = reader.result!.toString().replace("data:image/jpeg;base64,", "");

                he(profilePicture);
            };
        } else {
            he(null);
        }


    }

    return (
        <Dialog open={formState} onOpenChange={() => {
            setFormState(false);
            setError("");
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"mb-2"}>{type === "edit" ? "Изменить пользователя" : "Создать пользователя"}</DialogTitle>
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
                        <Label className={"text-red-600"}>{error}</Label>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleEditUser}>{type === "edit" ? "Изменить" : "Создать"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LkUserInteraction;