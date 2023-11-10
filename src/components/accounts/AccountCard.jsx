import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined } from '@ant-design/icons';
import { fetchMails } from '../../redux/slice/inboxSlice';
import { Link } from 'react-router-dom';
import { fetchDrive, fetchPhotos } from '../../redux/slice/tasksSlice';


const AccountCard = ({ img, userName, userEmail, id }) => {
    const dispatch = useDispatch();

    const handleInboxButtonClick = () => {
        dispatch(fetchMails({ id }));
    };

    const handleDriveButtonClick = () => {
        dispatch(fetchDrive({ id }));
    };

    const handlePhotoButtonClick = () => {
        dispatch(fetchPhotos({ id }));
    };


    return (
        <div className="account-card">
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
                <Link onClick={handlePhotoButtonClick}  className='card-btn'><PictureOutlined /></Link>
            </div>
            <div className="account-card-deleteBtn">
                <button className="card-deleteBtn"><DeleteOutlined /> </button>
            </div>
        </div>
    )
}

export default AccountCard