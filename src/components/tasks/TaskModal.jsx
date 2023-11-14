import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from '../../redux/slice/tasksSlice';

const TaskModal = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.tasks.selectedTask);

  useEffect(() => {
    dispatch(fetchTask({ id: taskId }));
  }, [dispatch, taskId]);


  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <div className="modal-header">
        <h3>{selectedTask?.name}</h3>
        <button className='modal-close' onClick={onClose}>Закрыть</button>
        </div>
        <div className="modal-account">
            <span>#{selectedTask?.id}</span>
        </div>
        <div className="modal-info">
            <span>Status: {selectedTask?.success ? <span className='modal-succes'> Success</span> : <span className='modal-failed'>Failed</span>}</span>
            
            <span className="modal-result">Result: {selectedTask?.data?.result}</span>
        </div>
        <div className="modal-btn">
            {selectedTask?.data?.link ? <button className='modal-drive'><a href={selectedTask?.data?.link}>drive</a></button> : ''}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;