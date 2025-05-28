import { ActionType } from '@/types/log';
import React from 'react';

interface ActivityItemProps {
    time: string;
    name: string;
    initials?: string;
    actionType: ActionType;
    taskTitle: string;
    taskDescription: string;
    taskPriority: string;
    logUpdatedAt: string;
    avatarBg?: string;
    avatarColor?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
    time,
    name,
    initials,
    actionType,
    taskTitle,
    taskDescription,
    taskPriority,
    logUpdatedAt,
    avatarBg,
    avatarColor,
}) => {
    const normalized = actionType.toUpperCase();
    let actionTypeColor: string;
    let actionTypeText: string;

    switch (normalized) {
        case 'CREATE_TASK':
            actionTypeColor = 'bg-green-500';
            actionTypeText = 'Görev Oluşturdu';
            break;
        case 'UPDATE_TASK':
            actionTypeColor = 'bg-blue-500';
            actionTypeText = 'Görev Güncellendi';
            break;
        case 'DELETE_TASK':
            actionTypeColor = 'bg-red-500';
            actionTypeText = 'Görev Silindi';
            break;
        case 'ADD_COMMENT':
            actionTypeColor = 'bg-yellow-500';
            actionTypeText = 'Yorum Eklendi';
            break;
        case 'UPLOAD_FILE':
            actionTypeColor = 'bg-indigo-500';
            actionTypeText = 'Dosya Yüklendi';
            break;
        case 'CHANGE_STATUS':
            actionTypeColor = 'bg-purple-500';
            actionTypeText = 'Durum Değiştirildi';
            break;
        case 'APPROVE_TASK':
            actionTypeColor = 'bg-teal-500';
            actionTypeText = 'Görev Onaylandı';
            break;
        default:
            actionTypeColor = 'bg-gray-500';
            actionTypeText = 'Bilinmeyen İşlem';
    }

    const taskPriorityColor = taskPriority.toUpperCase() === "CRITICAL" ? "bg-red-800" : taskPriority.toUpperCase() === 'HIGH' ? 'bg-red-500' : taskPriority.toUpperCase() === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500';
    return (
        <div className="flex items-start gap-[1vw] rounded-xl shadow px-[0.5vw] py-[1.2vh] my-[1vh] border-l-[0.6vh] border-[var(--color-primary)] min-w-[50vw]">
            {/* Zaman */}
            <div className="text-[1.6vh] text-[var(--color-light)] pt-[0.6vh] w-[6vh]">{time}</div>
            {/* Avatar */}
            <div className="w-[5.5vh] h-[5.5vh]">
                <img
                    src={`https://ui-avatars.com/api/?name=${initials}&background=${avatarBg}&color=${avatarColor}`}
                    alt={name}
                    className="rounded-full w-full h-full"
                    width={100}
                    height={100}
                />
            </div>
            {/* İçerik */}
            <div className="flex-1 flex-col">
                <div className="flex items-center gap-[1vw] flex-wrap">
                    <span className="font-semibold text-[2.2vh] text-gray-900">{name.toUpperCase()}</span>
                    <span className="font-semibold text-[2.2vh] text-gray-900">-</span>
                    <span
                        className={`text-white text-[1.8vh] font-medium rounded px-[1vw] py-[0.4vh] capitalize ${actionTypeColor}`}
                    >
                        {actionTypeText}
                    </span>
                </div>
                <div className="text-[2vh] text-black mt-[0.5vh]">
                    <span className="font-semibold text-[2.2vh] text-gray-900">{taskTitle.toUpperCase()}</span>
                    <span className="font-semibold text-[2.2vh] px-[0.5vw] text-gray-900">-</span>
                    <span className="text-[2.2vh] text-gray-900">{taskDescription}</span>
                </div>
            </div>
            <div className="flex items-center gap-[1vw]">
                <span className={`text-white text-[1.8vh] font-medium rounded px-[1vw] py-[0.4vh] capitalize ${taskPriorityColor}`}>{taskPriority.toUpperCase()}</span>
                <span className="font-semibold text-[2.2vh] text-gray-900">{logUpdatedAt.split('T')[0]}</span>
            </div>
        </div>
    );
};

export default ActivityItem;
