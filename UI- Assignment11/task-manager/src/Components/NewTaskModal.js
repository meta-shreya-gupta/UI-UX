import React, { useState } from 'react';
import './NewTaskModal.css';

export default function NewTaskModal({ showModal, setShowModal , addTask}) {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'New', // Default status, not shown in UI
        creationDate: new Date().toISOString().split('T')[0], // Default date, not shown in UI
        completionDate: '', // Will be used later but not shown
        priority: 'Medium' // Default priority
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setShowModal(false); // Close modal after submission
    };
    

    if (!showModal) return null; // If modal isn't open, return nothing.

    return (
        <div className='component'>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit} className='task-form'>

                <label>Title:</label>
                <input type="text" name="title" value={task.title} onChange={handleChange} required 
                    className='title' />

                <label>Description:</label>
                <textarea name="description" value={task.description} onChange={handleChange} required className='description' />

                <label>Priority:</label>
                <select name="priority" value={task.priority} onChange={handleChange} className='priority'>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <div className='btn'>
                    <button type="submit" onClick={() => setShowModal(true)} className="add-task-button">
                        Create Task
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className='cancel'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}