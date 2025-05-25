'use client'
import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';

const initialData = {
    yapılacaklar: [
        { id: '1', title: 'İş akışları', code: 'COL-12', author: 'Bahri Talha Baş', date: '20 Mar 2025' },
        { id: '22', title: 'İş akışları', code: 'COL-12', author: 'Bahri Talha Baş', date: '20 Mar 2025' },
        { id: '35', title: 'İş akışları', code: 'COL-12', author: 'Bahri Talha Baş', date: '20 Mar 2025' },
    ],
    devam: [
        { id: '2', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
        { id: '3', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
        { id: '4', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
    ],
    beklemede: [{ id: '222', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
    { id: '3222', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
    { id: '422', title: 'Api geliştirme', code: 'COL-3', author: 'Ömer Faruk Bingöl', date: '20 Mar 2025' },
    ],
    tamam: [],
};

const TaskBoard: React.FC = () => {
    const [columns, setColumns] = useState(initialData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns[source.droppableId as keyof typeof columns];
        const destCol = columns[destination.droppableId as keyof typeof columns];
        const [movedTask] = sourceCol.splice(source.index, 1);
        destCol.splice(destination.index, 0, movedTask);

        setColumns({
            ...columns,
            [source.droppableId]: sourceCol,
            [destination.droppableId]: destCol,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-screen w-full pt-[1.5vh] gap-4">
                <TaskColumn columnId="yapılacaklar" title="YAPILACAKLAR" tasks={columns.yapılacaklar} />
                <TaskColumn columnId="devam" title="DEVAM EDİYOR" tasks={columns.devam} />
                <TaskColumn columnId="beklemede" title="BEKLEMEDE" tasks={columns.beklemede} />
                <TaskColumn columnId="tamam" title="TAMAM" tasks={columns.tamam} />
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
