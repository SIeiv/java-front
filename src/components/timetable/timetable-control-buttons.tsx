import {Button} from "@/components/ui/button.tsx";
import {addToFavoritesAC, deleteFromFavoritesAC} from "@/store/profile/actionCreators.ts";
import filledStar from "@/assets/star.svg";
import {PenLine, Star, Trash2} from "lucide-react";
import {deleteTimetableAC} from "@/store/timetable/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {FC, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";

interface ITimetableControlButtons {
    isFavorite: boolean;
    num: number;
    groupName: string;
}

const TimetableControlButtons: FC<ITimetableControlButtons> = ({isFavorite, num, groupName}) => {
    const dispatch = useAppDispatch();
    const profileData = useAppSelector(state => state.auth.profileData);

    const [editTimetableForm, setEditTimetableForm] = useState(false);
    const [editTimetableId, setEditTimetableId] = useState(num);
    const [editTimetableGroupName, setEditTimetableGroupName] = useState(groupName);
    const handleEditTimetable = () => {

    }

    return (
        <div>

            <Dialog open={editTimetableForm} onOpenChange={() => {setEditTimetableForm(false)}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить расписание</DialogTitle>
                        <DialogDescription>
                            <Input placeholder={"id"} value={editTimetableId}
                                   onChange={(e) => {setEditTimetableId(Number(e.target.value))}}/>
                            <Input placeholder={"Название группы"} value={editTimetableGroupName}
                                   onChange={(e) => {setEditTimetableGroupName(e.target.value)}}/>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleEditTimetable}>Изменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {profileData.profile && <div className={"flex items-center justify-center"}>

                {isFavorite
                    ? <Button variant={"ghost"} onClick={() => {
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