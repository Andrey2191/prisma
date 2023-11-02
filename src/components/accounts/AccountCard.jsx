import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined } from '@ant-design/icons';
import { fetchMails } from '../../redux/slice/inboxSlice';
import { Link } from 'react-router-dom';


const AccountCard = ({ img, userName, userEmail, id }) => {
    const dispatch = useDispatch();
    const mails = useSelector(state => state.inbox.mails)

    // useEffect(() => {
    //     dispatch(fetchMails({id}))
    // }, [dispatch])

    const handleInboxButtonClick = () => {
        dispatch(fetchMails({ id }));
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
                <button className='card-btn'><CloudServerOutlined /></button>
                <Link  className='card-btn'><PictureOutlined /></Link>
            </div>
            <div className="account-card-deleteBtn">
                <button className="card-deleteBtn"><DeleteOutlined /> </button>
            </div>
        </div>
    )
}

export default AccountCard