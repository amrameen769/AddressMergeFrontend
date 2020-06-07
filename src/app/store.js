import {configureStore} from '@reduxjs/toolkit';
import sponsorsReducer from '../components/sponsors/sponsorsSlice';
import messagesReducer from '../components/messages/messagesSlice';
import authReducer from '../components/client/authSlice';
import candidateReducer from '../components/candidates/candidateSlice';
import donationsReducer from '../components/donations/donationsSlice';
import editorReducer from '../components/CKEditor/editorSlice';

export default configureStore({
    reducer: {
        sponsors: sponsorsReducer,
        candidates: candidateReducer,
        donations: donationsReducer,
        messages: messagesReducer,
        auth: authReducer,
        editor: editorReducer
    },
});
