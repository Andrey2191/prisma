import React, { useEffect, useState, useMemo } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, createBulkAccounts, fetchAccounts } from '../../redux/slice/accountsSlice';
import LogsCard from '../logs/LogsCard';
import { initWebSocket } from '../../socket/webSocket';
import {
    handleFileChange,
    handleDeleteAllButton,
    handleStarredButtonClick,
    handleAllAccountsButtonClick,
    handleLogsButtonClick,
    handleQueryButtonClick,
} from './accountsHandlers';
import { SettingOutlined } from '@ant-design/icons';
import SearchSettingsModal from '../settingsModal/SearchSettingsModal';
import InboxQueryCard from '../inboxQuery/InboxQueryCard';
import Drop from './Drop';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    const logs = useSelector(state => state.logs.logs);
    const queries = useSelector(state => state.query.query);
    const starredAccounts = useSelector(state => state.accounts.starredAccounts);
    const [searchText, setSearchText] = useState('');
    const [showStarredAccounts, setShowStarredAccounts] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [showQuery, setShowQuery] = useState(false);
    const [activeTab, setActiveTab] = useState('all-accounts');
    const [socket, setSocket] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dragActive, setDragActive] = useState(false)

    const sessionToken = useSelector(state => state.auth.sessionToken);
    const MemoizedAccountCard = React.memo(AccountCard);


    useEffect(() => {
        dispatch(fetchAccounts());
    }, [dispatch]);

    useEffect(() => {
        if (!socket) {
            const ws = initWebSocket(sessionToken, dispatch);
            setSocket(ws);
            console.log(ws);
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreate = (formValues) => {
        console.log('Form Values:', formValues);
        setIsModalVisible(false);
    };


    const [files, setFiles] = useState([])

    const handleDrag = (e) => {
        e.preventDefault()
        setDragActive(true)
    }
    const handleLeave = (e) => {
        e.preventDefault()
        setDragActive(false)
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        setDragActive(false)
        try {
            const files = e.dataTransfer.files;
            console.log(files);
            if (files.length > 1) {
                try {
                    await dispatch(createBulkAccounts(files));
                } catch (error) {
                    console.error('Error creating bulk accounts:', error);
                }
            } else if (files.length === 1) {
                const file = files[0];
                try {
                    await dispatch(createAccount(file));
                } catch (error) {
                    console.error('Error creating account:', error);
                }
            }
        } catch (error) {
            console.error('Error handling file change:', error);
        }
    }

    return (
        <div className="accounts" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
            {dragActive ? <Drop /> : (
                <div className='acc-container'>
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
                                onClick={() => handleAllAccountsButtonClick(dispatch, setShowLogs, setShowStarredAccounts, setActiveTab, setShowQuery)}
                                className={`all-accounts-btn ${activeTab === 'all-accounts' ? 'active-tab' : ''}`}
                            >
                                All Accounts
                            </button>
                            <button
                                onClick={() => handleStarredButtonClick(dispatch, setShowLogs, setShowStarredAccounts, setActiveTab, setShowQuery)}
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
                            <button
                                onClick={() => handleQueryButtonClick(dispatch, setShowQuery, setActiveTab, setShowLogs)}
                                className={`query-btn ${activeTab === 'query' ? 'active-tab' : ''}`}
                            >
                                Inbox query
                            </button>
                        </div>
                        <div className="accounts-content-search">
                            <input type="text"
                                placeholder='Search'
                                className="accounts-content-input"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                disabled={activeTab === 'logs' || activeTab === 'query'} />
                            {activeTab === 'query' ? <SettingOutlined className='account-search-settings' onClick={showModal} /> : ''}
                        </div>
                        <SearchSettingsModal
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            onCreate={handleCreate}
                        />
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
                            ) : showQuery ? (
                                <div className="query-container">
                                    {queries.map(query => (
                                        <InboxQueryCard
                                            id={query.ID}
                                            name={query.name}
                                            value={query.value}
                                            place={query.place}
                                            method={query.method}
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
                                                // console.log(account.inbox_results)
                                                <MemoizedAccountCard
                                                    key={account.ID}
                                                    id={account.ID}
                                                    userEmail={account.email}
                                                    userName={account.name}
                                                    img={account.photo}
                                                    starred={account.starred}
                                                    query={account.inbox_results}
                                                />
                                            ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Accounts


