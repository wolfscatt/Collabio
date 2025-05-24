import React from 'react';

interface ActivityItemProps {
    time: string;
    name: string;
    initials: string;
    status: string;
    statusType: 'tamam' | 'yapilacaklar' | 'devam-ediyor' | 'diğer';
    course: string;
    message: string;
    avatarBg?: string;
    avatarColor?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
    time,
    name,
    initials,
    status,
    statusType,
    course,
    message,
    avatarBg = 'ffd600',
    avatarColor = '333',
}) => {
    return (
        <div className="flex items-start gap-[1vw] bg-white rounded-xl shadow px-[0.5vw] py-[1.2vh] my-[1vh] border-l-[0.6vh] border-[var(--color-primary)] min-w-[50vw]">
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
            <div className="flex flex-col">
                <div className="flex items-center gap-[1vw] flex-wrap">
                    <span className="font-semibold text-[2.2vh] text-gray-900">{name}</span>
                    <span
                        className={`text-white text-[1.8vh] font-medium rounded px-[1vw] py-[0.4vh] capitalize ${statusType === 'tamam'
                            ? 'bg-[var(--color-green)]'
                            : statusType === 'yapilacaklar'
                                ? 'bg-[var(--color-orange)]'
                                : statusType === 'devam-ediyor'
                                    ? 'bg-[var(--color-red)]'
                                    : 'bg-[var(--color-light)]'
                            }`}
                    >
                        {status}
                    </span>
                    <span className="text-[2.1vh] text-[var(--color-primary)]">
                        {course}
                    </span>
                </div>
                <div className="text-[1.8vh] text-gray-700 mt-[0.5vh]">{message}</div>
            </div>
        </div>
    );
};

export default ActivityItem;
