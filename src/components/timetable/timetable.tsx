import {Label} from "@/components/ui/label.tsx";
import {useAppSelector} from "@/hooks.ts";
import {FC, ReactElement} from "react";
import TimetableItem from "@/components/timetable/timetableItem.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface TimetableProps {
    loading: boolean;
}

const Timetable: FC<TimetableProps> = ({loading}) => {
    const timetableData = useAppSelector(state => state.timetable.timetableData.timetable)

    const timetableItems: Array<ReactElement> | null = timetableData && timetableData.map(item =>
        <TimetableItem key={item.id} num={item.id} groupName={item.groupName} publicationDate={item.publicationDate} moderatorName={item.moderatorName}/>
    )

    return (
        <div className={"w-full h-full"}>
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
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default Timetable;