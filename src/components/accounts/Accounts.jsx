import React, { useEffect, useState } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, deleteAllAccounts, fetchAccounts, addToStarred  } from '../../redux/slice/accountsSlice';
import { fetchTasks } from '../../redux/slice/tasksSlice';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    const starredAccounts = useSelector(state => state.accounts.starredAccounts);
    const [searchText, setSearchText] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [showStarred, setShowStarred] = useState(false);
    console.log( accounts);


      useEffect(() => {
        dispatch(fetchAccounts());
      }, [dispatch]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            await dispatch(createAccount(file));
            console.log(accounts.length);
            console.log('Account created successfully!');
           
            setTimeout(() => {
                dispatch(fetchAccounts());
                dispatch(fetchTasks());
                console.log('10 sec');
              }, 10000);
           
          } catch (error) {
            console.error('Error creating account:', error);
          }
        }
      };

      const handleDeleteAllButton = () => {
        dispatch(deleteAllAccounts());
    };

    const handleStarredButtonClick = () => {
        setShowStarred(true);
    };

    const handleAllAccountsButtonClick = () => {
        setShowStarred(false);
    };

    // const filteredAccounts = accounts.filter(account =>
    //     (account.email.toLowerCase().includes(searchText.toLowerCase()) ||
    //         account.name.toLowerCase().includes(searchText.toLowerCase())) &&
    //     (selectedGroupId === null || account.account_group_id === selectedGroupId)
    // );

    const filteredAccounts = accounts.filter(account =>
        (account.email.toLowerCase().includes(searchText.toLowerCase()) ||
            account.name.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedGroupId === null || account.account_group_id === selectedGroupId) &&
        (showStarred ? starredAccounts.includes(account.ID) : true)
    );

    const uniqueGroupIds = [...new Set(accounts.map(account => account.account_group_id))];

    return (
        <div className="accounts">
            <div className="accounts-header">
                <div className="accounts-header-title">
                    <h2>Accounts</h2>
                </div>
                <div className="accounts-header-btns">
                    <input className='custom-file-input'  type="file" onChange={handleFileChange} />

                    <button onClick={handleDeleteAllButton} className="delete-all" >Delete all</button>
                    
                    {/* <button className="accounts-header-btn" onClick={handleBulkFileUpload}>Bulk Upload</button> */}
                </div>
            </div>
            <div className="accounts-content">
            <div className="accounts-content-filter">
                    <label>Filter by Group:</label>
                    <select
                        value={selectedGroupId || ''}
                        onChange={(e) => setSelectedGroupId(e.target.value === 'all' ? null : parseInt(e.target.value, 10))}
                    >
                        <option value='all'>All</option>
                        {uniqueGroupIds.map((groupId) => (
                            <option key={groupId} value={groupId}>{groupId}</option>
                        ))}
                    </select>
                    <button onClick={handleAllAccountsButtonClick} className="all-accounts-btn">All Accounts</button>
                    <button onClick={handleStarredButtonClick} className="starred-btn">Starred</button>
                </div>
                <div className="accounts-content-search">
                    <input type="text" 
                    placeholder='Search' 
                    className="accounts-content-input" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}/>
                </div>
                
                <div className="accounts-content-list">
                    {filteredAccounts.map((account) => { 
                        return <AccountCard id={account.ID} key={account.ID} userEmail={account.email} userName={account.name} img={account.photo} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Accounts


