import React, { useEffect } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, fetchAccounts } from '../../redux/slice/accountsSlice';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    console.log( accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
      }, [dispatch]);


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            await dispatch(createAccount(file));
            console.log('Account created successfully!');
          } catch (error) {
            console.error('Error creating account:', error);
          }
        }
      };

    return (
        <div className="accounts">
            <div className="accounts-header">
                <div className="accounts-header-title">
                    <h2>Accounts</h2>
                </div>
                <div className="accounts-header-btns">
                    <input type="file" onChange={handleFileChange} />
                    {/* <button className="accounts-header-btn" onClick={handleSubmit}>Load Single Cookie</button> */}
                    {/* <button className="accounts-header-btn" onClick={handleBulkFileUpload}>Bulk Upload</button> */}
                </div>
            </div>
            <div className="accounts-content">
                <div className="accounts-content-search">
                    <input type="text" placeholder='Search' className="accounts-content-input" />
                </div>
                <div className="accounts-content-list">
                    {accounts.map((account) => { 
                        return <AccountCard id={account.ID} key={account.ID} userEmail={account.email} userName={account.name} img={account.photo} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Accounts


