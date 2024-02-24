import { ChangeEvent, useState } from "react";

interface DropdownProps {
    options: string[],
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
        <>
            <select className="mb-4 p-2 border border-black rounded-md" value={selectedOption} onChange={(e) => handleSelect(e)} >
                <option value="" >{label}</option>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option} >{option[0].toUpperCase()+option.slice(1)}</option>
                    )
                })}
            </select>
        </>

    )
}
