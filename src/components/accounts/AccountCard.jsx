import { DeleteOutlined, CloudServerOutlined, InboxOutlined, PictureOutlined } from '@ant-design/icons';
const AccountCard = ({ img, userName, userEmail }) => {


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
                <button className='card-btn'><InboxOutlined /></button>
                <button className='card-btn'><CloudServerOutlined /></button>
                <button className='card-btn'><PictureOutlined /></button>
            </div>
            <div className="account-card-deleteBtn">
                <button className="card-deleteBtn"><DeleteOutlined /> </button>
            </div>
        </div>
    )
}

export default AccountCard