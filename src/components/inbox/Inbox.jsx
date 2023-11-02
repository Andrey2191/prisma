import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMails } from '../../redux/slice/inboxSlice';
import InboxCard from './InboxCard';
import './inbox.css'
import Header from '../header/Header'

const Inbox = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector(state => state.inbox.mails)

    useEffect(() => {
        dispatch(fetchMails({ id }))
    }, [dispatch])

    console.log(mails);

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
                    <div className="inbox-sidebar">
                        {/* sidebar */}
                    </div>
                    <div className="inbox-content-list">
                        {mails.map((mail) => {
                            return <InboxCard sender={mail.sender} subject={mail.subject} snippet={mail.snippet} time={mail.timestamp} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox