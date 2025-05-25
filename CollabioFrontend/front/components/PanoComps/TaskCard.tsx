import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface TaskCardProps {
  task: { id: string; title: string; author: string; date: string;};
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided) => (
      <div
        className="bg-white border-2 border-gray-100 rounded-md p-3 mb-3 shadow-sm"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h3 className="font-semibold">{task.title}</h3>
        <div className="flex justify-between  mt-2 text-sm">
          <span className="text-[1.7vh] line-clamp-1">{task.author}</span>
          <span className="text-gray-500 text-[1.7vh]">{task.date}</span>
        </div>
      </div>
    )}
  </Draggable>
);

export default TaskCard;
