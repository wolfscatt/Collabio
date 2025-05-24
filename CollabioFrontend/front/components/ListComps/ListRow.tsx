"use client"
import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

interface ListRowProps {
    icon: React.ReactNode;
    title: string;
    summary: string;
    status: 'to-do' | 'in-progress' | 'done';
    commentLength: number;
    category: string;
    categoryColor: string;
    assignee: string;
}

const statusColors: Record<string, string> = {
    'to-do': 'bg-red-100 text-red-600',
    'in-progress': 'bg-blue-100 text-blue-600',
    'done': 'bg-green-100 text-green-600',
};

const categoryColors: Record<string, string> = {
    'backend': 'bg-red-400 text-red-600',
    'frontend': 'bg-blue-400 text-blue-600',
    'database': 'bg-green-400 text-green-600',
    'ux/ui': 'bg-purple-400 text-purple-600',
    'iş analizi': 'bg-orange-400 text-orange-600',
    'test': 'bg-yellow-400 text-yellow-600',
};

const ListRow: React.FC<ListRowProps> = ({
    icon,
    title,
    summary,
    status,
    commentLength,
    category,
    assignee
}) => {
    const [checked, setChecked] = useState(false);

    return (
        <tr className={`h-[8vh] hover:bg-gray-50 ${checked ? 'bg-gray-100' : ''}`}>
            <td className="px-[1vw] py-[1vh]">
                <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            </td>

            <td className="px-[1vw] py-[1vh] text-[1.5rem]">{icon}</td>

            <td className="px-[1vw] py-[1vh] font-semibold text-[0.8rem] text-purple-900">
                {title}
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
                    className={`text-[0.75rem] px-[0.5rem] py-[0.2rem] rounded-full ${categoryColors[category]} text-[var(--color-background)]`}
                >
                    {category}
                </span>
            </td>

            <td className="px-[1vw] py-[1vh]">
                <span
                    className="w-[5vw] h-[2.2rem] text-[1.6vh] font-semibold rounded-full flex items-center justify-center text-black"
                >
                    {assignee.toUpperCase()}
                </span>
            </td>
        </tr>
    );
};

export default ListRow;
