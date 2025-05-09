import React, { useState } from 'react'
import NewTaskModal from './NewTaskModal';
export default function Header() {
    const [showModal, setShowModal] = useState(false); // State to handle modal visibility
    return (
        <header style={{ textAlign: 'center', padding: '10px', background: '#f4f4f4' }}>
            <h1>My Task Tracker</h1>
            {/* <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
                onClick={() => setShowModal(true)}>New Task
            </button> */}
            <NewTaskModal showModal={showModal} setShowModal={setShowModal} />
        </header>

    )
}