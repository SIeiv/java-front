import {Label} from "@/components/ui/label.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {FC, ReactElement, useRef, useState} from "react";
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
import LkTableItem from "@/components/lk-table/lk-table-item.tsx";

interface LkTableProps {
    loading: boolean;
    data: any;
    type?: "users" | "favourites";
}

const LkTable: FC<LkTableProps> = ({loading, data, type = "users"}) => {

    const lkTableItems: Array<ReactElement> | null = data && data.map(item => {
        if (type === "users") {
            return <LkTableItem key={item.id} id={item.id} username={item.username} email={item.email} roles={item.roles} type={"users"} username2={""}/>
        } else if (type === "favourites"){
            return <LkTableItem key={item.id} id={item.id} username={item.title} email={item.publicationDate} roles={item.moderatorName}
                                isFavorite={item.favourites} type={"favourites"} username2={item.authorName}/>
        }
    })

    const [addTimetableForm, setAddTimetableForm] = useState(false);
    const [groupname, setGroupName] = useState("");
    const avatarFileRef = useRef<HTMLInputElement>(null);

    /*const handleAddTimetable = async () => {
        await dispatch(addTimetableAC({groupname, library: avatarFileRef.current!.files!}));
        dispatch(getTimetableAC());
        setAddTimetableForm(false);
    }*/

    return (
        <div className={"w-full h-full pr-3"}>

            <Dialog open={addTimetableForm} onOpenChange={() => {setAddTimetableForm(false)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить расписание</DialogTitle>
                        <DialogDescription>
                            <div>
                                <Label>Название группы</Label>
                                <Input placeholder={"Введите название группы"} value={groupname} onChange={(e) => {setGroupName(e.target.value)}}/>
                            </div>
                            <div>
                                <Label>Файл расписания</Label>
                                <Input className={"mt-2"} type="file" ref={avatarFileRef}/>
                            </div>
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
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default LkTable;