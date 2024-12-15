import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";

import TimetableControlButtons from "@/components/timetable/timetable-control-buttons.tsx";

interface TimetableItemProps {
    num: number,
    groupName: string,
    publicationDate: string,
    moderatorName: string,
    isFavorite: boolean,
}

const TimetableItem: FC<TimetableItemProps> = ({num, groupName, publicationDate, moderatorName, isFavorite}) => {

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
                <TimetableControlButtons isFavorite={isFavorite} num={num} groupName={groupName}/>
            </div>
        </div>
    );
};

export default TimetableItem;