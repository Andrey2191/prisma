import React, { useEffect, useState, useMemo } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, deleteAllAccounts, fetchAccounts, addToStarred, readFile } from '../../redux/slice/accountsSlice';
import { fetchLogs } from '../../redux/slice/logsSlice';
import { fetchTasks } from '../../redux/slice/tasksSlice';
import setupWebSocket from '../../socket/webSocket';
import LogsCard from '../logs/LogsCard';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    const logs = useSelector(state => state.logs.logs);
    const starredAccounts = useSelector(state => state.accounts.starredAccounts);
    const [searchText, setSearchText] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [showStarredAccounts, setShowStarredAccounts] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [activeTab, setActiveTab] = useState('all-accounts');

    const sessionToken = useSelector(state => state.auth.sessionToken);
    console.log(sessionToken);

    const MemoizedAccountCard = React.memo(AccountCard);


    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    // useEffect(() => {
    //     const ws = setupWebSocket(dispatch, sessionToken);

    //     ws.onopen = () => {
    //         ws.send(JSON.stringify({ type: 'Authorization', token: sessionToken }));
    //       };

    //     ws.onclose = (event) => {
    //         console.error('WebSocket connection closed:', event);
    //     };

    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            try {
                await dispatch(createAccount(file));
                console.log(accounts.length);
                console.log('Account created successfully!');

                // setTimeout(() => {
                //     dispatch(fetchAccounts());
                //     dispatch(fetchTasks());
                //     console.log('10 sec');
                // }, 10000);

            } catch (error) {
                console.error('Error creating account:', error);
            }
        }
    };


    const handleDeleteAllButton = () => {
        dispatch(deleteAllAccounts());
    };

    const handleStarredButtonClick = () => {
        setShowLogs(false);
        setShowStarredAccounts(true);
        setActiveTab('starred');
    };

    const handleAllAccountsButtonClick = () => {
        setShowLogs(false);
        setShowStarredAccounts(false);
        setActiveTab('all-accounts');
    };

    const handleLogsButtonClick = () => {
        setShowLogs(true);
        dispatch(fetchLogs());
        setActiveTab('logs');
    };

    // const groupedAccounts = useMemo(() => {
    //     return (accounts || []).reduce((acc, account) => {
    //         const groupId = account.account_group_id || 'ungrouped';
    //         if (!acc[groupId]) {
    //             acc[groupId] = [];
    //         }
    //         acc[groupId].push(account);
    //         return acc;
    //     }, {});
    // }, [accounts]);

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
                    <input className='custom-file-input' type="file" onChange={handleFileChange} multiple />
                    <button onClick={handleDeleteAllButton} className="delete-all" >Delete all</button>
                </div>
            </div>
            <div className="accounts-content">
                <div className="accounts-content-filter">
                    <button
                        onClick={handleAllAccountsButtonClick}
                        className={`all-accounts-btn ${activeTab === 'all-accounts' ? 'active-tab' : ''}`}
                    >
                        All Accounts
                    </button>
                    <button
                        onClick={handleStarredButtonClick}
                        className={`starred-btn ${activeTab === 'starred' ? 'active-tab' : ''}`}
                    >
                        Starred
                    </button>
                    <button
                        onClick={handleLogsButtonClick}
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
                        disabled={activeTab === 'logs'}/>
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


