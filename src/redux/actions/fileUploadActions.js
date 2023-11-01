export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';

export const uploadFileSuccess = (file) => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: file,
});