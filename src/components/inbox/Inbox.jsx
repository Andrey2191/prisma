import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMails, fetchMessage, resetSelectedMessage, resetMails } from '../../redux/slice/inboxSlice';
import InboxCard from './InboxCard';
import './inbox.css'
import Header from '../header/Header'
import InboxSidebar from './InboxSidebar';
import MessagePage from './MessagePage';
import { Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Inbox = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector(state => state.inbox.mails)
    const selectedMessage = useSelector(state => state.inbox.selectedMessage)
    const isLoading = useSelector(state => state.inbox.loading)
    const activeLabel = useSelector(state => state.inbox.activeLabel);
    const [showMessagePage, setShowMessagePage] = useState(false);
    const [activeView, setActiveView] = useState('Primary');
    const [activeQuery, setActiveQuery] = useState('');
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        const query = activeQuery || '';
        const fetchData = async () => {
            await dispatch(fetchMails({ id, query, view: activeView, activeLabel }));
        };

        fetchData();
    }, [dispatch, id, activeView, activeQuery, activeLabel]);

    const handleCardClick = (messageId, threadId) => {
        dispatch(fetchMessage({ id, threadId, messageId }));
        setShowMessagePage(true);
    };

    const handleBackToInbox = () => {
        setShowMessagePage(false);
        dispatch(resetSelectedMessage())
    };

    const handleViewChange = (view, query, dataView, dataQuery) => {
        console.log('Handling view change:', view, query, dataView, dataQuery);
        setActiveView(view);
        setActiveQuery(query);
        setShowMessagePage(false);
        dispatch(resetMails())
        dispatch(fetchMails({ id, query: dataQuery, view: dataView }));
    };


    console.log(mails);


    // const filteredMails = mails.filter(mail =>
    //     mail.sender.toLowerCase().includes(searchText.toLowerCase()) ||
    //     mail.subject.toLowerCase().includes(searchText.toLowerCase())
    // );

    const filteredMails = mails.filter(mail =>
        (mail.sender && mail.sender.toLowerCase().includes(searchText.toLowerCase())) ||
        (mail.subject && mail.subject.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <div className='inbox-page'>
            <div className="inbox-header">
                <Header />
            </div>
            <div className="inbox-content">
            <Link to="/" className="return-home-button"> <ArrowLeftOutlined /> Home</Link>
                <div className="inbox-content-header">
                    <h1 className='inbox-header-title'>Inbox</h1>                    
                    <input value={searchText}
                        type="text"
                        placeholder='Search'
                        className="inbox-content-input"
                        onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <div className="inbox-main">
                    <div className="sidebar">
                        <InboxSidebar id={id} onSelectView={handleViewChange} />
                    </div>
                    {showMessagePage ? (
                        <div className="inbox-message-page">
                            {isLoading ? (
                                <div className="spin-container">
                                    <Spin size='large' className='spin' />
                                </div>
                            ) : (
                                <MessagePage
                                    sender={selectedMessage?.sender}
                                    receiver={selectedMessage?.receiver}
                                    subject={selectedMessage?.subject}
                                    onClick={handleBackToInbox}
                                    body={selectedMessage?.body}
                                />
                            )}

                        </div>
                    ) : (
                        <div className="inbox-content-list">
                            {isLoading ? (
                                <div className="spin-container">
                                    <Spin size='large' className='spin' />
                                </div>
                            ) : (
                                Array.isArray(filteredMails) ? (
                                    filteredMails.map((mail) => (
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
                                    ))
                                ) : (
                                    <p>Загрузка или пустое состояние...</p>
                                )
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Inbox