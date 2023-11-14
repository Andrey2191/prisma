import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined, CopyOutlined, RocketOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { fetchMails } from '../../redux/slice/inboxSlice';
import { Link } from 'react-router-dom';
import { fetchCookies, fetchDrive, fetchKeep, fetchPhotos } from '../../redux/slice/tasksSlice';
import { deleteAccount, fetchAccounts, addToStarred } from '../../redux/slice/accountsSlice';


const AccountCard = ({ img, userName, userEmail, id }) => {
    const dispatch = useDispatch();
    const starredAccounts = useSelector(state => state.accounts.starredAccounts);

    const handleInboxButtonClick = () => {
        dispatch(fetchMails({ id }));
    };

    const handleDriveButtonClick = () => {
        dispatch(fetchDrive({ id }));
    };

    const handlePhotoButtonClick = () => {
        dispatch(fetchPhotos({ id }));
    };
    const handleCookieButtonClick = () => {
        dispatch(fetchCookies({ id }));
    };
    const handleKeepButtonClick = () => {
        dispatch(fetchKeep({ id }));
    };
    const handleDeleteButtonClick = () => {
        dispatch(deleteAccount({ id })).then(() => {
            dispatch(fetchAccounts());
        })
    };

    const handleStarButtonClick = () => {
        // Диспатчим action для добавления или удаления аккаунта из звездных
        dispatch(addToStarred(id));
    };

    const isStarred = starredAccounts.includes(id);


    return (
        <div className="account-card">
            <button className={`star-btn ${isStarred ? 'starred' : ''}`} onClick={handleStarButtonClick}>
                {isStarred ? <StarFilled className='is-starred'/> : <StarOutlined />}
            </button>
            <div className="account-card-img">
                <img src={img} alt="user-img" className="card-img" />
            </div>
            <div className="accont-card-info">
                <span className="card-info-name">{userName}</span>
                <span className="card-info-email">{userEmail}</span>
            </div>
            <div className="account-card-btns">
                <Link to={`/inbox/${id}`} className='card-btn' onClick={handleInboxButtonClick}><InboxOutlined /></Link>
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
}

export default AccountCard