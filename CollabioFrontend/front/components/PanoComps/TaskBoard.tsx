"use client";

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';
import { useProjectTasks } from '@/hooks/useProjectTasks';

interface TaskCardData {
    id: string;
    title: string;
    author: string;
    date: string;
}

type ColumnsType = {
    yapılacaklar: TaskCardData[];
    devam: TaskCardData[];
    beklemede: TaskCardData[];
    tamam: TaskCardData[];
};

const TaskBoard: React.FC<{ reload: boolean }> = ({ reload }) => {
    const { tasks, loading } = useProjectTasks(reload);

    const [columns, setColumns] = useState<ColumnsType>({
        yapılacaklar: [],
        devam: [],
        beklemede: [],
        tamam: []
    });
    useEffect(() => {
        if (loading || tasks.length === 0) return;

        const grouped: ColumnsType = {
            yapılacaklar: [],
            devam: [],
            beklemede: [],
            tamam: [],
        };

        tasks.forEach((task) => {
            const mapped: TaskCardData = {
                id: task._id,
                title: task.title,
                author: task.assignee?.username || "Atanmamış",
                date: new Date(task.startDate || task.createdAt).toLocaleDateString("tr-TR"),
            };

            switch (task.status) {
                case "to-do":
                    grouped.yapılacaklar.push(mapped);
                    break;
                case "in-progress":
                    grouped.devam.push(mapped);
                    break;
                case "pending":
                    grouped.beklemede.push(mapped);
                    break;
                case "done":
                    grouped.tamam.push(mapped);
                    break;
                default:
                    grouped.yapılacaklar.push(mapped);
            }
        });

        setColumns(grouped);
    }, [tasks, loading, reload]);


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

        // TODO: Backend güncellemesi yapılabilir burada
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
