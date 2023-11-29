import { useDispatch } from 'react-redux';
import { createBulkAccounts, createAccount, deleteAllAccounts, deleteAccount, setStarAccount } from '../../redux/slice/accountsSlice';
import { fetchMails } from '../../redux/slice/inboxSlice';
import { fetchLogs } from '../../redux/slice/logsSlice';
import { fetchCookies, fetchDrive, fetchKeep, fetchPhotos } from '../../redux/slice/tasksSlice';

export const handleFileChange = async (event, dispatch) => {
  try {
    console.log('handleFileChange called');
    const files = event.target.files;
    console.log(files);
    if (files.length > 1) {
      console.log('Multiple files selected');
      try {
        await dispatch(createBulkAccounts(files));
        console.log('Bulk accounts created successfully!');
      } catch (error) {
        console.error('Error creating bulk accounts:', error);
      }
    } else if (files.length === 1) {
      console.log('Single file selected');
      const file = files[0];
      console.log(file);
      try {
        await dispatch(createAccount(file));
        console.log('Account created successfully!');
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }
  } catch (error) {
    console.error('Error handling file change:', error);
  }
};

export const handleDeleteAllButton = (dispatch) => {
  dispatch(deleteAllAccounts());
};

export const handleStarredButtonClick = (dispatch, setShowLogs, setShowStarredAccounts, setActiveTab) => {
  setShowLogs(false);
  setShowStarredAccounts(true);
  setActiveTab('starred');
};

export const handleAllAccountsButtonClick = (dispatch, setShowLogs, setShowStarredAccounts, setActiveTab) => {
  setShowLogs(false);
  setShowStarredAccounts(false);
  setActiveTab('all-accounts');
};

export const handleLogsButtonClick = (dispatch, setShowLogs, setActiveTab) => {
  setShowLogs(true);
  dispatch(fetchLogs());
  setActiveTab('logs');
};

export const useAccountCardHandlers = (id, starred) => {
  const dispatch = useDispatch();

  const handleInboxButtonClick = () => {
    dispatch(fetchMails({ id }));
  };

  const handleDriveButtonClick = () => {
    dispatch(fetchDrive({ id }));
  };

  const handlePhotoButtonClick = () => {
    dispatch(fetchPhotos({ id }));
  };

  const handleCookieButtonClick = () => {
    dispatch(fetchCookies({ id }));
  };

  const handleKeepButtonClick = () => {
    dispatch(fetchKeep({ id }));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteAccount({ id }));
  };

  const handleStarButtonClick = () => {
    const isCurrentlyStarred = starred;
    const newStarredValue = !isCurrentlyStarred;

    dispatch(setStarAccount({ id }));
  };

  return {
    handleInboxButtonClick,
    handleDriveButtonClick,
    handlePhotoButtonClick,
    handleCookieButtonClick,
    handleKeepButtonClick,
    handleDeleteButtonClick,
    handleStarButtonClick,
  };
};