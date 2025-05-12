import React, { useState, useEffect } from 'react';
import './NewTaskModal.css';
import { v4 as uuidv4 } from 'uuid';

export default function NewTaskModal({ showModal, setShowModal, addTask, initialTask }) {
    const [task, setTask] = useState({
        id: uuidv4(),
        title: '',
        description: '',
        status: 'New',
        creationDate: new Date().toISOString().split('T')[0],
        completionDate: '',
        priority: 'Medium'
    });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className='component'>
            <h2>{initialTask ? "Edit Task" : "Create New Task"}</h2>
            <form onSubmit={handleSubmit} className='task-form'>
                <label>Title:</label>
                <input type="text" name="title" value={task.title} onChange={handleChange} required className='title' />

                <label>Description:</label>
                <textarea name="description" value={task.description} onChange={handleChange} required className='description' />

                <label>Priority:</label>
                <select name="priority" value={task.priority} onChange={handleChange} className='priority'>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <button type="submit" className='buttons button1'>
{initialTask ? "Update Task" : "Create Task"}</button>
                <button type="button" className='button2 buttons' onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    );
}