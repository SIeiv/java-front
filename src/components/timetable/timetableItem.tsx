import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";
import {PenLine, Star, ThumbsUp, Trash2} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {addToFavoritesAC} from "@/store/profile/actionCreators.ts";
import {deleteTimetableAC} from "@/store/timetable/actionCreators.ts";

interface TimetableItemProps {
    num: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
    isFavorite: boolean,
}

const TimetableItem: FC<TimetableItemProps> = ({num, groupName, publicationDate, moderatorName, isFavorite}) => {
    const profileData = useAppSelector(state => state.auth.profileData);
    const dispatch = useAppDispatch();

    return (
        <div className={"flex items-center justify-center rounded-xl px-3 shadow h-10"}>
            <div className={"w-[245px]"}>{num}</div>
            <div className={"w-[245px]"}>{groupName}</div>
            <div className={"w-[245px]"}>{publicationDate}</div>
            <div className={"w-[245px]"}>{moderatorName}</div>
            <div className={"w-[245px] flex items-center justify-center"}>
                <Button variant={"ghost"} className={""}>
                    <a href={`http://localhost:8080/api/timetable/download?id=${num}`}>Скачать</a>
                </Button>
                    {profileData.profile && <div className={"flex items-center justify-center"}>
                        <Button variant={"ghost"} onClick={() => {
                            dispatch(addToFavoritesAC(num));
                        }}>
                            {isFavorite ? <Star /> : <ThumbsUp />}
                        </Button>
                        {(profileData.role === "ROLE_ADMIN" || profileData.role === "ROLE_MODERATOR") && <div className={"flex items-center justify-center"}>
                            <Button variant={"ghost"}>
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
        </div>
    );
};

export default TimetableItem;