import React, { useState } from "react";
import NewTaskModal from "./NewTaskModal";
import TaskCard from "./TaskCard";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Add a new task
    const addTask = (task) => {
        setTasks([...tasks, task]);
        setShowModal(false);
    };

    // Edit an existing task
    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setEditingTask(null);
    };

    // Delete a task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Add New Task</button>

            {/* Show modal for creating or editing tasks */}
            {showModal && !editingTask && (
                <NewTaskModal showModal={showModal} setShowModal={setShowModal} addTask={addTask} />
            )}
            {editingTask && (
                <NewTaskModal showModal={true} setShowModal={setShowModal} addTask={editTask} initialTask={editingTask} />
            )}

            {/* Display task list */}
            <div className="task-list">
                {tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onEdit={() => setEditingTask(task)} 
                        onDelete={deleteTask} 
                    />
                ))}
            </div>
        </div>
    );
}