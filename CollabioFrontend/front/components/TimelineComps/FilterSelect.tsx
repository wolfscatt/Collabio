// components/FilterSelect.js
import React from 'react';

interface FilterSelectProps {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, options, value, onChange }) => {
    return (
        <div className="flex flex-col ">
            <label className="text-[1.8vh] font-medium">{label}</label>
            <select
                className="p-[1vh] rounded border text-[1.8vh] w-[10vw]"
                value={value}
                onChange={onChange}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
