import React from 'react'
import { Task } from '@/types/task';

const TaskCart = ({ task }: { task: Task }) => {
    return (
        <div
            key={task._id}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:translate-x-1 transition-all duration-200 hover:shadow-md"
            style={{
                '--hover-bg': 'rgba(137, 114, 231, 0.05)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(137, 114, 231, 0.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
            }}
        >
            <div className="flex-1 flex-row items-center gap-2">
                <span className="font-medium text-blue-900 px-2 py-1 rounded-lg bg-blue-300">
                    {task.projectId.name}
                </span>
                <span className="text-gray-600 px-4">-</span>
                <span className="px-2 py-1 text-sm font-semibold rounded bg-purple-100 text-purple-800">
                    {task.title}
                </span>
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-gray-600 text-sm">
                    {task.endDate?.split("T")[0]}
                </span>
                <div
                    className="rounded-full flex items-center justify-center p-2 text-white text-xs font-semibold bg-blue-500"
                >
                    {task.assignee?.username.split(" ")[0]}
                </div>
            </div>
        </div>
    )
}

export default TaskCart
