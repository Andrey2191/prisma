import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const TaskCard = ({index, name, success}) => {


    return (
        <div className="task-card">
            <div className="task-card-index">
                # {index}
            </div>
            <div className="task-card-name">
                {name}
            </div>
            <div className="task-card-check">
            {success ? <CheckOutlined /> : <CloseOutlined className='task-close'/>}
            </div>
        </div>
    )
}

export default TaskCard