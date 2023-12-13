import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined, CopyOutlined, RocketOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAccountCardHandlers } from './accountsHandlers';
import { fetchInboxResult, resetMails } from '../../redux/slice/inboxQuerySlice';
import InboxCard from '../inbox/InboxCard';
import InboxQueryModal from '../inboxQuery/InboxQueryModal';


const AccountCard = React.memo(({ img, userName, userEmail, id, starred, query, queryId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedQueryId, setSelectedQueryId] = useState("");
    const mails = useSelector(state => state.query.mails);
    const dispatch = useDispatch();
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

    const handleSelectChange = (event) => {
        const selectedQueryId = event.target.value;
        if (selectedQueryId !== 'default') {
            dispatch(fetchInboxResult({ id: selectedQueryId }));
            setIsModalVisible(true);
        }
        setSelectedQueryId(selectedQueryId);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        dispatch(resetMails())
        setSelectedQueryId("");
    };


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
            {(query.length !== 0) ?
                <div className="account-card-dropdown">
                    <select className='card-select' onChange={handleSelectChange}>
                        <option value="default">Выберите запрос</option>
                        {query.map(qr => {
                            return <option key={qr.ID} value={qr.ID}>{qr.name}</option>
                        })}
                    </select>
                </div> : ''}

            {isModalVisible && <InboxQueryModal mails={mails} closeModal={closeModal} />}

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