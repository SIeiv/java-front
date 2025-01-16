import {FC} from "react";
import {Button} from "@/components/ui/button.tsx";

import TimetableControlButtons from "@/components/library/timetable-control-buttons.tsx";
import {IBook} from "@/api/library/types.ts";

const TimetableItem: FC<any> = ({num, groupName, publicationDate, moderatorName, isFavorite, authorName, title}) => {

    return (
        <div className={"flex items-center justify-center rounded-xl px-3 shadow h-10"}>

            <div className={"w-[196px]"}>{num}</div>
            <div className={"w-[196px]"}>{title}</div>
            <div className={"w-[196px]"}>{authorName}</div>
            <div className={"w-[196px]"}>{publicationDate}</div>
            <div className={"w-[196px]"}>{moderatorName}</div>
            <div className={"w-[220px] flex items-center justify-center"}>
                <Button variant={"ghost"} className={""}>
                    <a href={`http://localhost:8080/api/book/download?id=${num}`}>Скачать</a>
                </Button>
                <TimetableControlButtons isFavorite={isFavorite} num={num} author={authorName} title={title} moderatorName={moderatorName} publicationDate={publicationDate}/>
            </div>
        </div>
    );
};

export default TimetableItem;