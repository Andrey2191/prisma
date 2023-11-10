import { useDispatch } from 'react-redux';
import { fetchMessage } from '../../redux/slice/inboxSlice';


const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
};

const InboxCard = ({id, sender, snippet, time, messageId, threadId, onClick }) => {
    const dispatch = useDispatch();
    const truncatedSnippet = truncateText(snippet, 100)
    const formattedTime = formatDate(time);

    const handleClick = () => {
        dispatch(fetchMessage({ id, threadId, messageId }));
    };
    return (
        <div className="inbox-card" onClick={onClick}>
            <div className="inbox-card-info">
                <span className="inbox-card-email">{sender}</span>
            </div>
            <div className="inbox-card-message">
                <span className="inbox-card-snippet">{truncatedSnippet}</span>
            </div>
            <div className="inbox-card-date">
                <span className="inbox-card-time">{formattedTime}</span>
            </div>
        </div>
    )
}

export default InboxCard