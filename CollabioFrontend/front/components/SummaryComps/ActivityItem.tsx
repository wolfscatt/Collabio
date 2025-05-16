import React from 'react';
import { FaClock } from 'react-icons/fa';

export interface ActivityItemProps {
    name: string;
    avatarUrl: string;
    status: 'TAMAM' | 'DEVAM' | 'YAPILACAKLAR';
    taskTitle: string;
    description: string;
    timeAgo: number;
}

const statusColorMap: Record<ActivityItemProps['status'], string> = {
    TAMAM: '#2a9d8f',
    DEVAM: '#e76f51',
    YAPILACAKLAR: '#f4a261',
};

const ActivityItem: React.FC<ActivityItemProps> = ({
    name,
    avatarUrl,
    status,
    taskTitle,
    description,
    timeAgo,
}) => {
    return (
        <div className="flex gap-[1vw] py-[1.5vh] border-b border-[#f0f0f0]">
            <div className='flex w-[4vw] items-center justify-center'>
                <img
                    src={avatarUrl}
                    alt={name}
                    className="w-[2.5vw] h-[2.5vw] rounded-full"
                />
            </div>

            <div className="flex-1">
                <div className="mb-[0.4vh]">
                    <span className="font-medium text-[1.1rem] text-[var(--color-dark)]">
                        {name}
                    </span>

                    <span
                        className="ml-[0.5vw] inline-block text-[0.65rem] font-semibold px-[0.4rem] py-[0.15rem] rounded uppercase text-white"
                        style={{ backgroundColor: statusColorMap[status] }}
                    >
                        {status}
                    </span>

                    <span className="ml-[0.6vw] text-[0.95rem] text-[var(--color-primary)]">
                        {taskTitle}
                    </span>
                </div>

                <div className="text-[0.85rem] text-[var(--color-dark)] mb-[0.4vh]">
                    konusunda "{description}" alanını güncellendi
                </div>

                <div className="text-[0.75rem] flex flex-row items-center text-[var(--color-light)]">
                    <FaClock className='text-[2vh] mr-[0.5vh]' /> {timeAgo} gün önce
                </div>
            </div>
        </div>
    );
};

export default ActivityItem;
