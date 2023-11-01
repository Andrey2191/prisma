import { UPLOAD_FILE_SUCCESS } from '../actions/fileUploadActions';

const initialState = {
    uploadedFile: null,
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                uploadedFile: action.payload,
            };
        default:
            return state;
    }
};

export default fileReducer;