import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

interface Task {
    id: string;
    title: string;
    author: string;
    date: string;
}

interface TaskColumnProps {
    columnId: string;
    title: string;
    tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, tasks }) => {
    return (
        <div className="flex-1 bg-white rounded-md p-4">
            <div className="flex border-b-2 border-[var(--color-primary)] justify-between items-center">
                <div className="flex items-center mb-[1vh]">
                    <h2 className="font-bold text-purple-900">{title}</h2>
                    <span className="ml-2 bg-gray-200 rounded-full px-2 text-sm">{tasks.length}</span>
                </div>
                <button className="text-gray-500 text-xl mb-[1vh]">+</button>
            </div>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[100px] mt-[1vh] transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-purple-50' : ''
                            }`}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskColumn;
