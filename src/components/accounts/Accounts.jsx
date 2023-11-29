import React, { useEffect, useState, useMemo } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../redux/slice/accountsSlice';
import LogsCard from '../logs/LogsCard';
import { initWebSocket } from '../../socket/webSocket';
import {
    handleFileChange,
    handleDeleteAllButton,
    handleStarredButtonClick,
    handleAllAccountsButtonClick,
    handleLogsButtonClick,
} from './accountsHandlers';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    const logs = useSelector(state => state.logs.logs);
    const starredAccounts = useSelector(state => state.accounts.starredAccounts);
    const [searchText, setSearchText] = useState('');
    const [showStarredAccounts, setShowStarredAccounts] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [activeTab, setActiveTab] = useState('all-accounts');
    const [socket, setSocket] = useState(null);

    const sessionToken = useSelector(state => state.auth.sessionToken);
    const MemoizedAccountCard = React.memo(AccountCard);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    useEffect(() => {
        if (!socket) {
            const ws = initWebSocket(sessionToken, dispatch);
            setSocket(ws);
        }

        return () => {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        };
    }, [socket, sessionToken, dispatch]);


    const filteredAccounts = useMemo(() => {
        const sourceArray = showStarredAccounts ? starredAccounts : accounts;
        return sourceArray.reduce((acc, account) => {
            const groupId = account.account_group_id || 'ungrouped';
            if (!acc[groupId]) {
                acc[groupId] = [];
            }
            acc[groupId].push(account);
            return acc;
        }, {});
    }, [showStarredAccounts, accounts, starredAccounts]);

    return (
        <div className="accounts">
            <div className="accounts-header">
                <div className="accounts-header-title">
                    <h2>Accounts: {accounts?.length}</h2>
                </div>
                <div className="accounts-header-btns">
                    <input className='custom-file-input' type="file" onChange={(event) => handleFileChange(event, dispatch)} multiple />
                    <button onClick={() => handleDeleteAllButton(dispatch)} className="delete-all" >Delete all</button>
                </div>
            </div>
            <div className="accounts-content">
                <div className="accounts-content-filter">
                    <button
                        onClick={() => handleAllAccountsButtonClick(dispatch, setShowLogs, setShowStarredAccounts, setActiveTab)}
                        className={`all-accounts-btn ${activeTab === 'all-accounts' ? 'active-tab' : ''}`}
                    >
                        All Accounts
                    </button>
                    <button
                        onClick={() => handleStarredButtonClick(dispatch, setShowLogs, setShowStarredAccounts, setActiveTab)}
                        className={`starred-btn ${activeTab === 'starred' ? 'active-tab' : ''}`}
                    >
                        Starred
                    </button>
                    <button
                        onClick={() => handleLogsButtonClick(dispatch, setShowLogs, setActiveTab)}
                        className={`logs-btn ${activeTab === 'logs' ? 'active-tab' : ''}`}
                    >
                        Logs
                    </button>
                </div>
                <div className="accounts-content-search">
                    <input type="text"
                        placeholder='Search'
                        className="accounts-content-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        disabled={activeTab === 'logs'} />
                </div>
                <div className="accounts-content-list">
                    {showLogs ? (
                        <div className="logs-container">
                            {logs.map(log => (
                                <LogsCard
                                    key={log.ID}
                                    userName={log.name}
                                    userEmail={log.email}
                                    msg={log.message}
                                    img={log.photo}
                                />
                            ))}
                        </div>
                    ) : (
                        Object.keys(filteredAccounts).map((groupId) => (
                            <div key={groupId} className="account-group">
                                {filteredAccounts[groupId]
                                    .filter(account =>
                                        (account.starred || !showStarredAccounts) &&
                                        (account.email.toLowerCase().includes(searchText.toLowerCase()) ||
                                            account.name.toLowerCase().includes(searchText.toLowerCase()))
                                    )
                                    .map(account => (
                                        <MemoizedAccountCard
                                            key={account.ID}
                                            id={account.ID}
                                            userEmail={account.email}
                                            userName={account.name}
                                            img={account.photo}
                                            starred={account.starred}
                                        />
                                    ))}
                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>
    )
}

export default Accounts


