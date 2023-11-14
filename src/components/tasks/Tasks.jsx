import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard'
import './tasks.css'
import {  fetchTasks } from '../../redux/slice/tasksSlice';
import TaskModal from './TaskModal';


const Tasks = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.data);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const activeTasksCount = tasks.filter(task => task?.success).length;

    const handleCardClick = (id) => {
        setSelectedTaskId(id);
      };
    
      const handleCloseModal = () => {
        setSelectedTaskId(null);
      };

    return (
        <div className="tasks">
            <div className="tasks-header">
                <div className="tasks-header-title">
                    <h2>Tasks</h2>
                </div>
                <div className="tasks-header-info">
                    <span className="tasks-info">active {activeTasksCount}/{tasks.length}</span>
                </div>
            </div>
            <div className="tasks-content">
                <div className="tasks-content-list">
                    {tasks.map((task) => {
                        return <TaskCard onClick={() => handleCardClick(task?.id)} key={task?.id} index={task?.id} name={task?.name} success={task?.success} />
                    })}
                </div>
            </div>
            {selectedTaskId !== null && (
                <TaskModal taskId={selectedTaskId} onClose={handleCloseModal} />
            )}
        </div>
    )
}

export default Tasks