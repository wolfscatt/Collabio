"use client"
import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

interface ListRowProps {
    icon: React.ReactNode;
    code: string;
    summary: string;
    status: 'YAPILACAKLAR' | 'DEVAM EDİYOR' | 'TAMAMLANDI';
    commentLength: number;
    category: string;
    categoryColor: string;
    assignee: { initials: string; color: string };
}

const statusColors: Record<string, string> = {
    'YAPILACAKLAR': 'bg-red-100 text-red-600',
    'DEVAM EDİYOR': 'bg-blue-100 text-blue-600',
    'TAMAMLANDI': 'bg-green-100 text-green-600',
};

const ListRow: React.FC<ListRowProps> = ({
    icon,
    code,
    summary,
    status,
    commentLength,
    category,
    categoryColor,
    assignee
}) => {
    const [checked, setChecked] = useState(false);

    return (
        <tr className={`h-[8vh] hover:bg-gray-50 ${checked ? 'bg-gray-100' : ''}`}>
            <td className="px-[1vw] py-[1vh]">
                <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            </td>

            <td className="px-[1vw] py-[1vh] text-[1.5rem]">{icon}</td>

            <td className="px-[1vw] py-[1vh] font-semibold text-[1.1rem] text-purple-900">
                {code}
            </td>

            <td className="px-[1vw] py-[1vh] text-[1rem]">{summary}</td>

            <td className="px-[1vw] py-[1vh]">
                <span
                    className={`px-[0.5rem] py-[0.25rem] rounded-full text-[0.75rem] font-semibold ${statusColors[status]}`}
                >
                    {status}
                </span>
            </td>

            <td className="px-[1vw] py-[1vh] text-[1rem] text-gray-800">
                <div className="flex items-center gap-[0.5vw]">
                    <FaCommentDots className="text-[1.2rem]" />
                    {commentLength > 0 ? `${commentLength} yorum` : 'Yorum ekleyin'}
                </div>
            </td>

            <td className="px-[1vw] py-[1vh]">
                <span
                    className="text-[0.75rem] px-[0.5rem] py-[0.2rem] rounded-full"
                    style={{ backgroundColor: categoryColor, color: '#333' }}
                >
                    {category}
                </span>
            </td>

            <td className="px-[1vw] py-[1vh]">
                <span
                    className="w-[2.2rem] h-[2.2rem] text-[0.75rem] font-semibold rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: assignee.color }}
                >
                    {assignee.initials}
                </span>
            </td>
        </tr>
    );
};

export default ListRow;
