import React from 'react';
import { useDispatch } from 'react-redux';
import './inboxQuery.css'
import { DeleteOutlined } from '@ant-design/icons';
import { handleDeleteQueryButtonClick } from '../accounts/accountsHandlers';


const InboxQueryCard = React.memo(({ name, value, place, method, id }) => {
    const dispatch = useDispatch();

    return (
        <div className="query-card">
            <div className="query-card-info">
                <div className="name">
                <span className="query-info-name">Name: {name}</span>
                <span className="query-info-value">Value: {value}</span>
                </div>
                <div className="query-card-msg">
                <span className="query-msg"> Place: {place}</span>
                <span className="query-msg">Method: {method}</span>
            </div>
            </div>
            
            <div className="query-card-deleteBtn">
                <button onClick={() => handleDeleteQueryButtonClick(id, dispatch)} className="card-deleteBtn"><DeleteOutlined /> </button>
            </div>
        </div>
    )
})

export default InboxQueryCard