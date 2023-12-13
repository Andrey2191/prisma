import React from 'react';
import './inboxQuery.css'
import InboxQueryMessage from './InboxQueryMessage';

const InboxQueryModal = ({ mails, closeModal }) => (
  <div className="modal">
    <div className="modal-query-header">
        <button className='modal-query-btn' onClick={closeModal}>Close</button>
    </div>  
    <div className="modal-query-content">
    <ul>
      {mails.map((message, index) => (
        <InboxQueryMessage key={index} sender={message.sender} body={message.body} time={message.CreatedAt} subject={message.subject} />
      ))}
    </ul>
    </div>
    
  </div>
);

export default InboxQueryModal;