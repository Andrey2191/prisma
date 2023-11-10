import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard'
import './tasks.css'
import { fetchTasks } from '../../redux/slice/tasksSlice';


const Tasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.data);

    useEffect(() => {
        dispatch(fetchTasks());
      }, [dispatch]);

      console.log(Object.keys(tasks).length);

      const activeTasksCount = tasks.filter(task => task.success).length;

      console.log(activeTasksCount);

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
                    {tasks.slice().reverse().map((task) => {
                        return <TaskCard key={task.id} index={task.id} name={task.name} success={task.success}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tasks