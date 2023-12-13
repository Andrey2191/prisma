import { useDispatch } from 'react-redux';
import './inboxQuery.css'
import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';




const InboxQueryMessage = ({id, sender, subject, time, body }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };
    
    const formattedTime = formatDate(time);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
      };

    return (
        <div className="inbox-query-card" >
            <div className="query-card-header">
            <div className="inbox-query-card-info">
                <span className="inbox-query-card-email">{sender}</span>
            </div>
            <div className="inbox-query-card-message">
                <span className="inbox-query-card-snippet">{subject}</span>
            </div>
            <div className="inbox-query-card-date">
                <span className="inbox-query-card-time">{formattedTime}</span>
            </div>
            <div className="inbox-query-card-btn">
                <button onClick={toggleExpansion} className='query-card-btn'>{!isExpanded ? <DownOutlined /> : <UpOutlined />}</button>
            </div>
            </div>
            {isExpanded && (
            <div className="inbox-query-card-body">
            <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
      )}
        </div>
    )
}

export default InboxQueryMessage