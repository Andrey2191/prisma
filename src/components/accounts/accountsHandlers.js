import { useDispatch } from 'react-redux';
import { createBulkAccounts, createAccount, deleteAllAccounts, deleteAccount, setStarAccount } from '../../redux/slice/accountsSlice';
import { fetchMails } from '../../redux/slice/inboxSlice';
import { fetchLogs } from '../../redux/slice/logsSlice';
import { fetchCookies, fetchDrive, fetchKeep, fetchPhotos } from '../../redux/slice/tasksSlice';
import { deleteInboxQuery, fetchInboxQuery } from '../../redux/slice/inboxQuerySlice';

export const handleFileChange = async (event, dispatch) => {
  try {
    const files = event.target.files;
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
};

export const handleDeleteAllButton = (dispatch) => {
  dispatch(deleteAllAccounts());
};

export const handleStarredButtonClick = (dispatch, setShowLogs, setShowStarredAccounts, setActiveTab, setShowQuery) => {
  setShowLogs(false);
  setShowQuery(false);
  setShowStarredAccounts(true);
  setActiveTab('starred');
};

export const handleAllAccountsButtonClick = (dispatch, setShowLogs, setShowStarredAccounts, setActiveTab, setShowQuery) => {
  setShowLogs(false);
  setShowQuery(false);
  setShowStarredAccounts(false);
  setActiveTab('all-accounts');
};

export const handleLogsButtonClick = (dispatch, setShowLogs, setActiveTab) => {
  setShowLogs(true);
  dispatch(fetchLogs());
  setActiveTab('logs');
};

export const handleQueryButtonClick = (dispatch, setShowQuery, setActiveTab, setShowLogs) => {
  setShowLogs(false);
  setShowQuery(true);
  dispatch(fetchInboxQuery());
  setActiveTab('query');
}

export const handleDeleteQueryButtonClick = (id , dispatch) => {
  dispatch(deleteInboxQuery({ id }));
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