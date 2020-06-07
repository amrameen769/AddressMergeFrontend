import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";
import {apiDataUrl} from "../misc/utility";

const initialState = {
    documents: "",
    editContentData: ""
}

export const slice = createSlice({
    name: 'editor',
    initialState: initialState,
    reducers: {
        saveContent: (state, action) => {
            state.documents.unshift(action.payload);
        },
        getDocuments: (state, action) => {
            state.documents = action.payload;
        },
        editContent: (state, action) => {
            state.editContentData = action.payload
        },
    }
})

export const {saveContent, getDocuments, editContent} = slice.actions;

export const createContent = document => (dispatch, getState) => {
    axios.post(apiDataUrl + '/documents/', document, tokenConfig(getState))
        .then(result => {
            dispatch(saveContent(result.data));
            dispatch(getNotifications(createMessage("Content Saved", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}


export const fetchDocuments = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/documents/', tokenConfig(getState))
        .then(result => {
            dispatch(getDocuments(result.data));
            dispatch(getNotifications(createMessage("Documents Loaded", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

// Edit Content
export const editThisContent = (document) => (dispatch) => {
    const {id, docName, docContent, owner} = document;
    const editDoc = {id, docName, docContent, owner};
    // console.log(editDoc);
    dispatch(editContent(editDoc));
}

export default slice.reducer;