import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMails, fetchMessage } from '../../redux/slice/inboxSlice';
import InboxCard from './InboxCard';
import './inbox.css'
import Header from '../header/Header'
import InboxSidebar from './InboxSidebar';
import MessagePage from './MessagePage';

const Inbox = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector(state => state.inbox.mails)
    const selectedMessage = useSelector(state => state.inbox.selectedMessage)
    const [showMessagePage, setShowMessagePage] = useState(false);

    useEffect(() => {
        dispatch(fetchMails({ id }))
    }, [dispatch])

    const handleCardClick = (messageId, threadId) => {
        dispatch(fetchMessage({ id, threadId, messageId }));
        setShowMessagePage(true);
    };

    const handleBackToInbox = () => {
        setShowMessagePage(false);
    };

    const handleCloseMessage = () => {

    }

    console.log(showMessagePage);

    return (
        <div className='inbox-page'>
            <div className="inbox-header">
                <Header />
            </div>
            <div className="inbox-content">
                <div className="inbox-content-header">
                    <h1 className='inbox-header-title'>Inbox</h1>
                    <input type="text" placeholder='Search' className="inbox-content-input" />
                </div>
                <div className="inbox-main">
                    <div className="sidebar">
                        <InboxSidebar />
                    </div>
                    {showMessagePage ? (
                        <div className="inbox-message-page">
                            <MessagePage 
                                sender={selectedMessage.sender} 
                                receiver={selectedMessage.receiver} 
                                subject={selectedMessage.subject}
                                onClick={handleBackToInbox} 
                                body={selectedMessage?.body} 
                             />
                        </div>
                    ) : (
                        <div className="inbox-content-list">
                            {mails.map((mail) => (
                                <InboxCard
                                    key={mail.message_id}
                                    id={id}
                                    messageId={mail.message_id}
                                    threadId={mail.thread_id}
                                    sender={mail.sender}
                                    subject={mail.subject}
                                    snippet={mail.snippet}
                                    time={mail.timestamp}
                                    onClick={() => handleCardClick(mail.message_id, mail.thread_id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Inbox