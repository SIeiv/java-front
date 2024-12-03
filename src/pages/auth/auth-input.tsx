import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FC} from "react";

interface AuthInputProps {
    title: string;
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
}

const AuthInput: FC<AuthInputProps> = ({title, placeholder, value, onChange}) => {
    return (
        <div>
            <Label className={"text-sm font-medium text-slate-900"}>{title}</Label>
            <Input className={"w-96 h-10 text-xl mt-1.5"} placeholder={placeholder} value={value} onChange={(e) => {onChange!(e.target.value)}}/>
        </div>
    );
};

export default AuthInput;