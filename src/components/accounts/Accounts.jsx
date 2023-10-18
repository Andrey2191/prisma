import './accounts.css'
import AccountCard from './AccountCard'

const db = [
    {
        name: 'qweqwe',
        email: 'zxczxc@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: '123123',
        email: '123123@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
    {
        name: 'wwwwww',
        email: 'wwwwww@zxc',
        img: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg?w=2000'
    },
]

const Accounts = () => {


    return (
        <div className="accounts">
            <div className="accounts-header">
                <div className="accounts-header-title">
                    <h2>Accounts</h2>
                </div>
                <div className="accounts-header-btns">
                    <button className="accounts-header-btn">Load cookie</button>
                </div>
            </div>
            <div className="accounts-content">
                <div className="accounts-content-search">
                    <input type="text" placeholder='Search' className="accounts-content-input" />
                </div>
                <div className="accounts-content-list">
                    {db.map((card) => {
                     return   <AccountCard userEmail={card.email} userName={card.name} img={card.img}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Accounts