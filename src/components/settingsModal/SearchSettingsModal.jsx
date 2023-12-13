import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchSettingsModal.css';
import { createInboxQuery, fetchInboxQuery } from '../../redux/slice/inboxQuerySlice';

const SearchSettingsModal = ({ visible, onCancel, onCreate }) => {
    const dispatch = useDispatch();
    const inboxQuery = useSelector(state => state.query.query)
    const [formValues, setFormValues] = useState({
        place: 'sender',
        method: 'equal',
        value: '',
        name: '',
    });

    useEffect(() => {
        dispatch(fetchInboxQuery());
    }, [dispatch]);


    const handleCreate = async () => {
        try {
            const queryData = {
                method: formValues.method,
                name: formValues.name,
                place: formValues.place,
                value: formValues.value,
            }
            dispatch(createInboxQuery(queryData))

            setFormValues({
                method: '',
                name: '',
                place: '',
                value: '',
            });
            onCancel();
        } catch (error) {
            console.error('Ошибка при создании запроса в почтовом ящике:', error);
        }
    };

    return (
        <div className={`modal-overlay ${visible ? 'visible' : ''}`}>
            <div className="custom-modal">
                <div className="modal-header">
                <h2>Search Settings</h2>
                </div>
                <div className="modal-content">
                    <div className="modal-content-dropdown">
                    <label>
                        Place:
                        <select
                            value={formValues.place}
                            onChange={(e) => setFormValues({ ...formValues, place: e.target.value })}
                        >
                            <option value="sender">Sender</option>
                            <option value="subject">Subject</option>
                        </select>
                    </label>
                    <label>
                        Method:
                        <select
                            value={formValues.method}
                            onChange={(e) => setFormValues({ ...formValues, method: e.target.value })}
                        >
                            <option value="equal">Equal</option>
                            <option value="contain">Contain</option>
                            <option value="start">Start</option>
                            <option value="end">End</option>
                        </select>
                    </label>
                    </div>
                   <div className="modal-content-input">
                   <label>
                        Value:
                        <input
                            className='modal-input'
                            type="text"
                            value={formValues.value}
                            onChange={(e) => setFormValues({ ...formValues, value: e.target.value })}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            className='modal-input'
                            type="text"
                            value={formValues.name}
                            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        />
                    </label>
                   </div>

                </div>
                <div className="modal-buttons">
                    <button className='btn-close btn' onClick={onCancel}>Cancel</button>
                    <button className='btn-create btn' onClick={handleCreate}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default SearchSettingsModal;
