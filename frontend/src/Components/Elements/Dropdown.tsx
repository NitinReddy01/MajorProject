import { ChangeEvent, useState } from "react";

type Option = {
    key:string,
    value:string
}

interface DropdownProps {
    options: Option[],
    onSelect: (option: string) => void,
    label: string
}

export default function Dropdown({ onSelect, options,label }: DropdownProps) {
    const [selectedOption, setSelectedOption] = useState<string>();
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        onSelect(e.target.value);
    }
    return (
        <div className="w-full" >
            <div className="text-lg font-semibold text-left ">{label}</div>
            <select className=" w-[100%] mb-4 p-2 border border-black rounded-md" value={selectedOption} onChange={(e) => handleSelect(e)} >
                <option value="" >{label}</option>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.value} >{option.key}</option>
                    )
                })}
            </select>
        </div>

    )
}
