"use client"
import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import Comments from '../Modals/Comments';
import api from '@/lib/api';
interface ListRowProps {
    icon: React.ReactNode;
    title: string;
    summary: string;
    status: 'to-do' | 'in-progress' | 'done' | 'review';
    commentLength: number;
    category: string;
    categoryColor: string;
    assignee: string;
    taskId: string;
}

const statusColors: Record<string, string> = {
    'to-do': 'bg-red-100 text-red-600',
    'in-progress': 'bg-blue-100 text-blue-600',
    'done': 'bg-green-100 text-green-600',
    'review': 'bg-yellow-100 text-yellow-600',
};

const categoryColors: Record<string, string> = {
    'backend': 'bg-red-400 text-red-600',
    'frontend': 'bg-blue-400 text-blue-600',
    'database': 'bg-green-400 text-green-600',
    'ux/ui': 'bg-purple-400 text-purple-600',
    'i̇ş analizi': 'bg-orange-400 text-orange-700',
    'test': 'bg-yellow-400 text-yellow-700',
};

const ListRow: React.FC<ListRowProps> = ({
    icon,
    title,
    summary,
    status,
    commentLength,
    category,
    assignee,
    taskId
}) => {
    const [showComments, setShowComments] = useState(false);
    const key = category.toLowerCase();
    const submitComment = async (text: string, file?: File) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("content", text);
            if (file) {
                formData.append("file", file);
            }

            await api.post(
                `/comments/${taskId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // istersen burada toast vs.
        } catch (err) {
            console.error("Yorum eklenemedi:", err);
        }
    };
    return (
        <>
            <tr className="h-[8vh] hover:bg-gray-50">
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
                    <div className="flex items-center gap-[0.5vw] cursor-pointer" onClick={() => setShowComments(!showComments)}>
                        <FaCommentDots className="text-[1.2rem]" />
                        {commentLength > 0 ? `${commentLength} yorum` : 'Yorum ekleyin'}
                    </div>
                </td>

                <td className="px-[1vw] py-[1vh]">
                    <span
                        className={`text-[0.75rem] px-[0.5rem] py-[0.2rem] rounded-full ${categoryColors[key]} text-[var(--color-background)]`}
                    >
                        {key}
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
            {showComments && <Comments onClose={() => setShowComments(false)} onSubmit={submitComment} taskId={taskId} />}
        </>
    );
};

export default ListRow;
