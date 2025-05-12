import React, { useState } from 'react'
import NewTaskModal from './NewTaskModal';
export default function Header() {
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility
    return (
        <header style={{ textAlign: 'center', padding: '10px' }}>
            <h1>My Task Tracker</h1>
            
            <NewTaskModal showModal={showModal} setShowModal={setShowModal} />
        </header>

    )
}