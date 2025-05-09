import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header'
import TaskBoard from './Components/TaskBoard';
import NewTaskModal from './Components/NewTaskModal';
function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // Append new task
  };

  return (
    <div className='App'>
      <Header />
      <button onClick={() => setShowModal(true)} className="add-task-button">
        Add Task
      </button>

      <NewTaskModal showModal={showModal} setShowModal={setShowModal} addTask={addTask} />
      <TaskBoard tasks={tasks} />
    </div>

  );
}

export default App;
