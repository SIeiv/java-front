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

interface TimetableProps {
    loading: boolean;
}

const Timetable: FC<TimetableProps> = ({loading}) => {
    const timetableData = useAppSelector(state => state.timetable.timetableData.timetable);
    const role = useAppSelector(state => state.auth.profileData.role);

    const dispatch = useAppDispatch();

    const timetableItems: Array<ReactElement> | null = timetableData && timetableData.map(item =>
        <TimetableItem key={item.id} num={item.id} groupName={item.groupName} publicationDate={item.publicationDate} moderatorName={item.moderatorName} isFavorite={item.isFavourite}/>
    )

    const [addTimetableForm, setAddTimetableForm] = useState(false);
    const [groupname, setGroupName] = useState("");
    const avatarFileRef = useRef<HTMLInputElement>(null);

    const handleAddTimetable = async () => {
        await dispatch(addTimetableAC({groupname, timetable: avatarFileRef.current!.files!}));
        dispatch(getTimetableAC());
        setAddTimetableForm(false);
    }

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
                        <Button onClick={handleAddTimetable}>Добавить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className={"mt-1.5 w-full h-full"}>
                {loading
                    ? <Skeleton className={"w-full h-[500px]"}/>
                    : <div>
                        <div className={"flex justify-between px-3"}>
                            <Label className={"w-[245px] h-10 flex items-center"}>№</Label>
                            <Label className={"w-[245px] h-10 flex items-center"}>Название группы</Label>
                            <Label className={"w-[245px] h-10 flex items-center"}>Дата публикации</Label>
                            <Label className={"w-[245px] h-10 flex items-center"}>Автор публикации</Label>
                            <div className={"w-[245px] h-10"}></div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            {timetableItems}
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

export default Timetable;