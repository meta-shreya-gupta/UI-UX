import React from 'react';
import './TaskBoard.css'; // Import the CSS file for styling
import TaskCard from './TaskCard';

export default function TaskBoard({ tasks}) {
    return (
        <div className="board">
            <div className="column new">
                <h1 className="new-col">New</h1>
                <hr />
                {tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))}
            </div>
            <div className="column progress">
                <h1 className="progress-col">In Progress</h1>
            </div>
            <div className="column completed">
                <h1 className="completed-col">Completed</h1>
            </div>
        </div>
    );
}