import React from 'react';
import { useDrop } from 'react-dnd';
import './TaskBoard.css';
import TaskCard from './TaskCard';

const ITEM_TYPE = "TASK";
const priorities = ["High", "Medium", "Low"];

export default function TaskBoard({ tasks, setTasks, onEdit, onDelete }) {
    // Sort tasks before rendering
    const sortedTasks = [...tasks].sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority));

    // Function to update task status when dragged to a new column
    const moveTask = (taskId, newStatus) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                        completionDate: newStatus === "Completed"
                            ? new Date().toISOString().split('T')[0]
                            : ""
                    }
                    : task
            );

            // Sort tasks by priority after movement
            return updatedTasks.sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority));
        });
    };

    return (
        <div className="board">
            {["New", "In Progress", "Completed"].map(status => (
                <Column
                    key={status}
                    status={status}
                    tasks={sortedTasks}
                    moveTask={moveTask}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

// Column Component for Task Categories
function Column({ status, tasks, moveTask, onEdit, onDelete }) {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item) => moveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`column ${status.toLowerCase()}`} style={{ background: isOver ? "#f0f0f0" : "" }}>
            <h1>{status}</h1>
            <hr />
            {tasks.filter(task => task.status === status).map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}