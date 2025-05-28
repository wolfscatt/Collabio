import { ActionType } from '@/types/log';
import React from 'react';
import { FaClock } from 'react-icons/fa';

export interface ActivityItemProps {
    name: string;
    avatarUrl: string;
    actionType: ActionType;
    taskTitle: string;
    description: string;
    timeAgo: string;
}

export const statusColorMap: Record<string, string> = {
    create_task: "#2a9d8f",
    update_task: "#e76f51",
    delete_task: "#f4a261",
    add_comment: "#2a9d8f",
    upload_file: "#2a9d8f",
    change_status: "#e76f51",
    approve_task: "#f4a261",
};

export const ACTION_LABELS: Record<string, string> = {
    create_task: "Görev Oluşturdu",
    update_task: "Görev Güncellendi",
    delete_task: "Görev Silindi",
    add_comment: "Yorum Eklendi",
    upload_file: "Dosya Yüklendi",
    change_status: "Durum Değiştirdi",
    approve_task: "Görev Onayladı",
};

const ActivityItem: React.FC<ActivityItemProps> = ({
    name,
    avatarUrl,
    actionType,
    taskTitle,
    description,
    timeAgo,
}) => {
    const key = actionType.toLowerCase();
    const badgeLabel = ACTION_LABELS[key] || actionType;
    const badgeColor = statusColorMap[key] || "#888";

    
    return (
        <div className="flex gap-[1vw] py-[1.5vh] border-b border-[#f0f0f0]">
            <div className='flex w-[4vw] items-center justify-center'>
                <img
                    src={avatarUrl}
                    alt={name}
                    className="w-[2.5vw] h-[2.5vw] rounded-full"
                    width={100}
                    height={100}
                />
            </div>

            <div className="flex-1">
                <div className="mb-[0.4vh]">
                    <span className="font-medium text-[1.1rem] text-[var(--color-dark)]">
                        {name}
                    </span>

                    <span
                        className="ml-[0.5vw] text-[0.65rem] px-[0.4rem] py-[0.15rem] rounded"
                        style={{ backgroundColor: badgeColor }}
                    >
                        {badgeLabel}
                    </span>

                    <span className="ml-[0.6vw] text-[0.95rem] text-[var(--color-primary)]">
                        {taskTitle}
                    </span>
                </div>

                <div className="text-[0.85rem] text-[var(--color-dark)] mb-[0.4vh]">
                    {description}
                </div>

                <div className="text-[0.75rem] flex flex-row items-center text-[var(--color-light)]">
                    <FaClock className='text-[2vh] mr-[0.5vh]' /> {timeAgo}
                </div>
            </div>
        </div>
    );
};

export default ActivityItem;
