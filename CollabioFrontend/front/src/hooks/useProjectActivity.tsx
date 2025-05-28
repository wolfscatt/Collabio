// /hooks/useProjectActivity.ts
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { useSelectedProject } from '@/context/SelectedProjectContext';
import { parseISO } from 'date-fns';

export interface LogEntry {
    _id: string;
    authorUserId: { _id: string; username: string };
    actionType: string;
    taskId: string;
    timeStamp: string; // ISO string
    createdAt: string;
    updatedAt: string;
}

export interface ActivityEntry {
    logId: string;
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskPriority: string;
    actionType: string;
    authorName: string;
    authorInitials: string;
    timestamp: string;       // ISO string
    timestampDate: Date;     // JS Date
}

export function useProjectActivity() {
    const { selectedProject } = useSelectedProject();
    const { tasks, loading: tasksLoading } = useProjectTasks(Boolean(selectedProject?._id));

    const [entries, setEntries] = useState<ActivityEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tasksLoading || !selectedProject?._id) {
            setEntries([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        Promise.all(
            tasks.map((t) =>
                api.get<LogEntry[]>(`/logs/${t._id}`)
                    .then(res =>
                        res.data.map(log => ({
                            logId: log._id,
                            taskId: t._id,
                            taskTitle: t.title,
                            taskDescription: t.description,
                            taskPriority: t.priority,
                            actionType: log.actionType,
                            authorName: log.authorUserId.username,
                            authorInitials: log.authorUserId.username
                                .split(' ')
                                .map(n => n[0])
                                .join(''),
                            timestamp: log.timeStamp,
                            timestampDate: parseISO(log.timeStamp),
                        }))
                    )
            )
        )
            .then(arrays => setEntries(arrays.flat()))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [tasks, tasksLoading, selectedProject]);

    return { entries, loading };
}
