import { TaskCard } from "./TaskCard";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onApprove?: (code: string) => void;
  onReject?: (code: string) => void;
}

export const TaskList = ({ tasks, onApprove, onReject }: TaskListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
};
