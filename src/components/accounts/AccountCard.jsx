import React from 'react';
import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined, CopyOutlined, RocketOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAccountCardHandlers } from './accountsHandlers';


const AccountCard = React.memo(({ img, userName, userEmail, id, starred }) => {

    const {
        handleInboxButtonClick,
        handleDriveButtonClick,
        handlePhotoButtonClick,
        handleCookieButtonClick,
        handleKeepButtonClick,
        handleDeleteButtonClick,
        handleStarButtonClick,
    } = useAccountCardHandlers(id, starred);

    const isGmail = userEmail.endsWith("gmail.com");

    return (
        <div className="account-card">
            <button className={`star-btn ${starred ? 'starred' : ''}`} onClick={handleStarButtonClick}>
                {starred ? <StarFilled className='is-starred' /> : <StarOutlined />}
            </button>
            <div className="account-card-img">
                <img src={img} alt="user-img" className="card-img" />
            </div>
            <div className="accont-card-info">
                <span className="card-info-name">{userName}</span>
                <span className="card-info-email">{userEmail}</span>
            </div>
            <div className="account-card-btns">
                {isGmail && (
                <Link to={`/inbox/${id}`} className='card-btn' onClick={handleInboxButtonClick}>
                    <InboxOutlined />
                </Link>
            )}
                <button onClick={handleDriveButtonClick} className='card-btn'><CloudServerOutlined /></button>
                <Link onClick={handlePhotoButtonClick} className='card-btn'><PictureOutlined /></Link>
                <Link onClick={handleCookieButtonClick} className='card-btn'><RocketOutlined /></Link>
                <Link onClick={handleKeepButtonClick} className='card-btn'><CopyOutlined /></Link>
            </div>
            <div className="account-card-deleteBtn">
                <button onClick={handleDeleteButtonClick} className="card-deleteBtn"><DeleteOutlined /> </button>
            </div>
        </div>
    )
})

export default AccountCard