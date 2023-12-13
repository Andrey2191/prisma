import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from '../../redux/slice/tasksSlice';
import axios from 'axios';

const TaskModal = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.tasks.selectedTask);

  useEffect(() => {
    dispatch(fetchTask({ id: taskId }));
  }, [dispatch, taskId]);

  const handleButtonClick = () => {
    if (selectedTask?.type === 'fetch_drive_link'|| 'fetch_photos_link' && selectedTask?.data?.link) {
      // Если тип таски - fetch_drive_link и есть ссылка, перейдите по ссылке
      window.open(selectedTask.data.link, '_blank');
    } else if (selectedTask?.type === 'create_cookie' && selectedTask?.data?.link) {
      // Если тип таски - create_cookie и есть ссылка, начните скачивание
      const link = selectedTask.data.link.startsWith('/')
        ? 'https://plifal.tech' + selectedTask?.data?.link // замените process.env.REACT_APP_BASE_URL на ваш базовый URL
        : selectedTask?.data?.link;

      axios.get(link, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = link.split('/').pop(); // имя файла из URL
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Ошибка при скачивании файла:', error));

    }
  };


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
          {selectedTask?.data?.link ? <button className='modal-drive' onClick={handleButtonClick}>{selectedTask.type === 'fetch_drive_link' || 'fetch_photos_link' ? 'drive' : 'download'}</button> : ''}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;