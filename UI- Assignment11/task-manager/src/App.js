import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

import Header from './Components/Header';
import TaskBoard from './Components/TaskBoard';
import NewTaskModal from './Components/NewTaskModal';

const priorities = ["High", "Medium", "Low"];

function App() {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    // Sort tasks by priority
    const sortTasksByPriority = (tasks) => {
        return tasks.sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority));
    };

    // Add Task and sort
    const addTask = (newTask) => {
        setTasks((prevTasks) => sortTasksByPriority([...prevTasks, newTask]));
        setShowModal(false);
    };

    // Edit Task and sort
    const editTask = (updatedTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
            return sortTasksByPriority(updatedTasks);
        });
        setEditingTask(null);
    };

    // Delete Task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='App'>
                <div className='main-header'>
                    <Header />
                    <button onClick={() => setShowModal(true)} className="add-task-button">
                        Add Task
                    </button>
                </div>

                {/* Show modal for creating or editing tasks */}
                {showModal && !editingTask && (
                    <NewTaskModal showModal={showModal} setShowModal={setShowModal} addTask={addTask} />
                )}
                {editingTask && (
                    <NewTaskModal showModal={true} setShowModal={setShowModal} addTask={editTask} initialTask={editingTask} />
                )}

                <TaskBoard tasks={tasks} setTasks={setTasks} onEdit={setEditingTask} onDelete={deleteTask} />
            </div>
        </DndProvider>
    );
}

export default App;