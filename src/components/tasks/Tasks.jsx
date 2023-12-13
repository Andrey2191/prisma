import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard'
import './tasks.css'
import {  fetchTasks, resetSelectedTask } from '../../redux/slice/tasksSlice';
import TaskModal from './TaskModal';
import { initWebSocket } from '../../socket/webSocket';



const Tasks = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.data);
    const sessionToken = useSelector(state => state.auth.sessionToken);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [socket, setSocket] = useState(null);
    const [selectedTaskData, setSelectedTaskData] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const activeTasksCount = tasks.filter(task => task?.success).length;

    const handleCardClick = (id) => {
        setSelectedTaskId(id);
      };
    
      const handleCloseModal = () => {
        setSelectedTaskId(null);
        dispatch(resetSelectedTask())
      };

      const handleWebSocketUpdate = (jsonData) => {
        console.log("WebSocket Data in Accounts:", jsonData.in_work);
        setSelectedTaskData(jsonData);
    };

    useEffect(() => {
        if (!socket) {
            const ws = initWebSocket(sessionToken, dispatch, handleWebSocketUpdate);
            setSocket(ws);
            console.log(ws);
        }

        return () => {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        };
    }, [socket, sessionToken, dispatch]);

    

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
                        return <TaskCard onClick={() => handleCardClick(task?.id)} jsonData={selectedTaskData} key={task?.id} index={task?.id} name={task?.name} success={task?.success} />
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