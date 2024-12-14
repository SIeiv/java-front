import {Label} from "@/components/ui/label.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {FC, ReactElement, useRef, useState} from "react";
import TimetableItem from "@/components/timetable/timetableItem.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {addTimetableAC, getTimetableAC} from "@/store/timetable/actionCreators.ts";
import LkTableItem from "@/components/lk-table/lk-table-item.tsx";

interface LkTableProps {
    loading: boolean;
}

const LkTable: FC<LkTableProps> = ({loading}) => {
    const allUsersData = useAppSelector(state => state.auth.getAllUsersData);
    const role = useAppSelector(state => state.auth.profileData.role);

    const dispatch = useAppDispatch();

    const lkTableItems: Array<ReactElement> | null = allUsersData.allUsers && allUsersData.allUsers.map(user =>
        <LkTableItem key={user.id} id={user.id} username={user.username} email={user.email} roles={user.roles}/>
    )

    const [addTimetableForm, setAddTimetableForm] = useState(false);
    const [groupname, setGroupName] = useState("");
    const avatarFileRef = useRef<HTMLInputElement>(null);

    /*const handleAddTimetable = async () => {
        await dispatch(addTimetableAC({groupname, timetable: avatarFileRef.current!.files!}));
        dispatch(getTimetableAC());
        setAddTimetableForm(false);
    }*/

    return (
        <div className={"w-full h-full"}>

            <Dialog open={addTimetableForm} onOpenChange={() => {setAddTimetableForm(false)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить расписание</DialogTitle>
                        <DialogDescription>
                            <Input placeholder={"Название группы"} value={groupname} onChange={(e) => {setGroupName(e.target.value)}}/>
                            <Input className={"mt-2"} type="file" ref={avatarFileRef}/>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button>Добавить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className={"mt-1.5 w-full h-full"}>
                {loading
                    ? <Skeleton className={"w-full h-[500px]"}/>
                    : <div>
                        <div className={"flex justify-between px-3"}>

                        </div>
                        <div className={"flex flex-col gap-2"}>
                            {lkTableItems}
                            {(role === "ROLE_MODERATOR" || role === "ROLE_ADMIN")
                                && <Button onClick={() => {setAddTimetableForm(true)}} className={"h-10 rounded-xl"}>Добавить расписание</Button>
                            }
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default LkTable;