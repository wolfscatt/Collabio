import React from 'react'
const colorMap = {
    'Yapılacak': '#f4a261',
    'Devam Ediyor': '#e76f51',
    'Tamamlandı': '#2a9d8f',
};
interface Task {
    label: string;
    count: number;
}

export interface TaskDistributionProps {
    name: string;
    avatarUrl: string;
    tasks: Task[];
}
const TaskDistribution: React.FC<TaskDistributionProps> = ({ name, avatarUrl, tasks }) => {
    const totalTasks = tasks.reduce((sum, t) => sum + t.count, 0);

    return (
        <div className="flex items-center gap-4 border-b border-[#f0f0f0] pb-4">
            <div className="flex items-center gap-2 w-32">
                <img
                    src={avatarUrl}
                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                    alt={name}
                />
                <span className="text-sm text-[var(--color-dark)]">{name}</span>
            </div>

            <div className="flex-1">
                <div className="h-2 bg-gray-100 rounded flex overflow-hidden mb-1">
                    {tasks.map((task, index) => {
                        const widthPercent = (task.count / totalTasks) * 100;
                        const color = colorMap[task.label as keyof typeof colorMap] || '#ccc';

                        return (
                            <div
                                key={index}
                                className="h-full"
                                style={{
                                    width: `${widthPercent}%`,
                                    backgroundColor: color,
                                }}
                            ></div>
                        );
                    })}
                </div>
                <div className="text-xs text-[var(--color-light)] flex gap-3">
                    {tasks.map((task, index) => (
                        <span key={index}>
                            {task.count} {task.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskDistribution
