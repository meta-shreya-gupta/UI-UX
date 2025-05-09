import React from 'react';
import'./TaskCard.css';

export default function TaskCard({ task }) {
    return (
        <div className={`task-card ${task.priority.toLowerCase()}`}>
            <><h4>{task.title}</h4>
            <p><small><strong>Description: </strong></small>{task.description}</p>
            <p><small><strong>Priority:</strong> {task.priority}</small></p>
            <p><small><strong>Created On:</strong> {task.creationDate}</small></p>
            </>
        </div>
    );
}