import React from 'react';
import './logs.css'


const LogsCard = React.memo(({ img, userName, userEmail, msg }) => {

    return (
        <div className="logs-card">
            <div className="logs-card-img">
                <img src={img} alt="user-img" className="card-img" />
            </div>
            <div className="logs-card-info">
                <span className="logs-info-name">{userName}</span>
                <span className="logs-info-email">{userEmail}</span>
            </div>
            <div className="logs-card-msg">
                <span className="logs-msg">{msg}</span>
            </div>
        </div>
    )
})

export default LogsCard