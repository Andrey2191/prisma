import { ArrowLeftOutlined } from '@ant-design/icons';

const MessagePage = ({body, onClick, sender, receiver, subject}) => {

    return (
        <div className="message-page">
            <div className="message-header">
                <div className='message-subject'>
                    <h2>{subject}</h2>
                </div>
            <div>
                <button className="msg-close" onClick={onClick}><ArrowLeftOutlined/></button>
            </div>
            <div className="message-info">
                <span>from: {sender}</span>
                <span>to: {receiver}</span>
            </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    )
}

export default MessagePage