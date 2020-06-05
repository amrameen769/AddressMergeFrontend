import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";

const initialState = {
    content: ""
}

export const slice = createSlice({
    name: 'editor',
    initialState: initialState,
    reducers: {
        saveContent: (state, action) => {
            state.content = action.payload;
        }
    }
})

export const {saveContent} = slice.actions;

export const createContent = document => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/core/documents/', document, tokenConfig(getState))
        .then(result => {
            dispatch(saveContent(result.data));
            dispatch(getNotifications(createMessage("Content Saved", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

export default slice.reducer;