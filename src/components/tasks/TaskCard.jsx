import { CheckOutlined } from '@ant-design/icons';

const TaskCard = ({index, email}) => {


    return (
        <div className="task-card">
            <div className="task-card-index">
                {index}
            </div>
            <div className="task-card-email">
                {email}
            </div>
            <div className="task-card-check">
            <CheckOutlined />
            </div>
        </div>
    )
}

export default TaskCard