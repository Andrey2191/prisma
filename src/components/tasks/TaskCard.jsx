import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const TaskCard = ({ index, name, success, onClick, jsonData }) => {

    // useEffect(() => {

    // }, [jsonData]);



    return (
        <div className="task-card" onClick={onClick}>
            <div className="task-card-index">
                # {index}
            </div>
            <div className="task-card-name">
                {name}
            </div>
            <div className="task-card-check">
                {success ? <CheckOutlined /> : <CloseOutlined className='task-close' />}
                {/* {jsonData && jsonData.id === index ? (
                    jsonData.in_work ? <LoadingOutlined className='task-load'/> : (
                        <CheckOutlined />
                    )
                ) : (
                    success ? <CheckOutlined /> : <CloseOutlined className='task-close' />
                )} */}
            </div>
        </div>
    )
}

export default TaskCard