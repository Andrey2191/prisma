
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
};

const InboxCard = ({ sender, subject, snippet, time }) => {
    const truncatedSnippet = truncateText(snippet, 100)
    const formattedTime = formatDate(time);
    return (
        <div className="inbox-card">
            <div className="inbox-card-info">
                <span className="inbox-card-email">{sender}</span>
            </div>
            <div className="inbox-card-message">
                {/* <span className="inbox-card-subject">{subject}</span> */}
                <span className="inbox-card-snippet">{truncatedSnippet}</span>
            </div>
            <div className="inbox-card-date">
                <span className="inbox-card-time">{formattedTime}</span>
            </div>
        </div>
    )
}

export default InboxCard