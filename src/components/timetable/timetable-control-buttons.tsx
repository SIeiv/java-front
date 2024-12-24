import {Button} from "@/components/ui/button.tsx";
import {addToFavoritesAC, deleteFromFavoritesAC} from "@/store/profile/actionCreators.ts";
import filledStar from "@/assets/star.svg";
import {PenLine, Star, Trash2} from "lucide-react";
import {deleteTimetableAC, editTimetableAC} from "@/store/timetable/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {FC, useRef, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {IEditTimetableRequest} from "@/api/timetable/types.ts";
import {Label} from "@/components/ui/label.tsx";

interface ITimetableControlButtons {
    isFavorite: boolean;
    num: number;
    groupName: string;
    publicationDate: string;
    moderatorName: string;
}

const TimetableControlButtons: FC<ITimetableControlButtons> = ({isFavorite, num, groupName, publicationDate, moderatorName}) => {
    const dispatch = useAppDispatch();
    const profileData = useAppSelector(state => state.auth.profileData);
    const [editTimetableForm, setEditTimetableForm] = useState(false);
    const [editTimetableGroupName, setEditTimetableGroupName] = useState(groupName);
    /*const [editTimetablePublicationDate, setEditTimetablePublicationDate] = useState(publicationDate);*/
    const fileRef = useRef<HTMLInputElement>(null);

    console.log(groupName, publicationDate, moderatorName);

    const handleEditTimetable = () => {
        const reader = new FileReader();
        reader.readAsDataURL(fileRef.current!.files![0]);
        reader.onload = function () {
            const picture = reader.result!.toString().replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");

            const data: IEditTimetableRequest = {
                id: num,
                groupName: editTimetableGroupName,
                moderatorName,
                publicationDate,
                file: picture
            }

            dispatch(editTimetableAC(data));
            setEditTimetableForm(false);
        };
    }

    return (
        <div>

            <Dialog open={editTimetableForm} onOpenChange={() => {setEditTimetableForm(false)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"mb-3"}>Изменить расписание</DialogTitle>
                        <DialogDescription className={"flex flex-col gap-3"}>
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Название группы</Label>
                                <Input placeholder={"Введите название группы"} value={editTimetableGroupName}
                                       onChange={(e) => {setEditTimetableGroupName(e.target.value)}}/>
                            </div>

                            {/*<DatePicker initialDate={editTimetablePublicationDate} initialTimeSetter={setEditTimetablePublicationDate}/>*/}
                            {/*<Input placeholder={"Дата публикации"} value={editTimetablePublicationDate}
                                   onChange={(e) => {setEditTimetablePublicationDate(e.target.value)}}/>*/}
                            {/*<Input placeholder={"Автор"} value={editTimetableModeratorName}
                                   onChange={(e) => {setEditTimetableModeratorName(e.target.value)}}/>*/}
                            <div className={"flex flex-col gap-1.5"}>
                                <Label>Файл расписания</Label>
                                <Input ref={fileRef} type={"file"}/>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleEditTimetable}>Изменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {profileData.profile && <div className={"flex items-center justify-center"}>

                {isFavorite
                    ? <Button variant={"ghost"} className={"w-11"} onClick={() => {
                        dispatch(deleteFromFavoritesAC(num));
                    }}>
                        <img className={"w-4"} src={filledStar} alt=""/>
                    </Button>
                    : <Button variant={"ghost"} onClick={() => {
                        dispatch(addToFavoritesAC(num));
                    }}>
                        <Star/>
                    </Button>
                }

                {(profileData.role === "ROLE_ADMIN" || profileData.role === "ROLE_MODERATOR") && <div className={"flex items-center justify-center"}>
                    <Button variant={"ghost"} onClick={() => {
                        setEditTimetableForm(true);
                    }}>
                        <PenLine />
                    </Button>
                    <Button variant={"ghost"} onClick={() => {
                        dispatch(deleteTimetableAC(num))
                    }}>
                        <Trash2 />
                    </Button>
                </div>}
            </div>}
        </div>
    );
};

export default TimetableControlButtons;