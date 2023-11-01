import React, { useCallback, useEffect } from 'react';
import './accounts.css'
import AccountCard from './AccountCard'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, fetchAccounts } from '../../redux/slice/accountsSlice';


const Accounts = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.accounts.data);
    // console.log( accounts.id);

    useEffect(() => {
        dispatch(fetchAccounts());
      }, [dispatch]);


    const readFile = useCallback(async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = function (e) {
                resolve(e.target.result);
            };

            fileReader.onerror = function (e) {
                reject(e.target.error);
            };

            fileReader.readAsText(file);
        });
    }, []);

    // const handleFileChange = async (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         try {
    //             const fileContent = await readFile(file);
    //             const response = await axios.post('https://plifal.tech/api/accounts/', {
    //                 file_name: file.name,
    //                 cookies: fileContent
    //             });
    //             console.log('Response:', response.data);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    // };

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
                        return <AccountCard key={account.ID} userEmail={account.email} userName={account.name} img={account.photo} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Accounts


