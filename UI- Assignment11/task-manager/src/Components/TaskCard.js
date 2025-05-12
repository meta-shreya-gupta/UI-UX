import React from "react";
import { useDrag } from "react-dnd";
import "./TaskCard.css";

const ITEM_TYPE = "TASK";

export default function TaskCard({ task, onEdit, onDelete }) {
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={`task-card ${task.priority.toLowerCase()}`} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h4>{task.title}</h4>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Created On:</strong> {task.creationDate}</p>

            {/* Display Completion Date ONLY IF task is completed */}
            {task.status === "Completed" && (
                <p><strong>Completion Date:</strong> {task.completionDate}</p>
            )}

            {/* Show Edit Button ONLY IF status is NOT "Completed" */}
            <div className="task-buttons" style={{display:"flex" , justifyContent:"space-around"}}>
                {task.status !== "Completed" && (
                    <button className="edit-btn" style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}
 onClick={() => onEdit(task)}>Edit</button>
                )}
                <button className="delete-btn" style={{ color: "red",  fontSize: "20px", fontWeight: "bold" }} onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
}