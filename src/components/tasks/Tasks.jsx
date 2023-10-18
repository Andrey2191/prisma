import TaskCard from './TaskCard'
import './tasks.css'

const taskDB = [
    {
        index: '#1111',
        email: '123@qwe.com'
    },
    {
        index: '#2222',
        email: 'qqqqnet@qwe.com'
    },
    {
        index: '#1241',
        email: '12qwdqwd3@qwe.com'
    },
    {
        index: '#7271',
        email: '123gggg@qwe.com'
    },
    {
        index: '#5523',
        email: '113123@qwe.com'
    },
    {
        index: '#6284',
        email: '123bnmbnm@qwe.com'
    },
    {
        index: '#0052',
        email: '123@qwe.com'
    },
    {
        index: '#3452',
        email: '123@qwe.com'
    },
    {
        index: '#4291',
        email: '123@qwe.com'
    },
    {
        index: '#2266',
        email: '22wer@qwe.com'
    },
    {
        index: '#9953',
        email: 'werwer@qwe.com'
    },
    {
        index: '#1105',
        email: '12qd3@qwe.com'
    },
]

const Tasks = () => {


    return (
        <div className="tasks">
            <div className="tasks-header">
                <div className="tasks-header-title">
                    <h2>Tasks</h2>
                </div>
                <div className="tasks-header-info">
                    <span className="tasks-info">active 0/20</span>
                </div>
            </div>
            <div className="tasks-content">
                <div className="tasks-content-list">
                    {taskDB.map((task) => {
                        return <TaskCard index={task.index} email={task.email}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tasks