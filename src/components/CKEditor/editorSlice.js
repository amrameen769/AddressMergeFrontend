import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";
import {apiDataUrl} from "../misc/utility";

const initialState = {
    documents: [],
    documentTypes: [],
    editContentData: null,
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
        getDocumentTypes: (state, action) => {
            state.documentTypes = action.payload;
        },
        addDocumentType: (state, action) => {
            state.documentTypes.unshift(action.payload);
        },
        editContent: (state, action) => {
            state.editContentData = action.payload
        },
        updateDocument: (state, action) => {
            state.editContentData = null;
            const documentIndex = state.documents.findIndex(doc => doc.id === action.payload.id);
            state.documents[documentIndex] = action.payload;
        },
        deleteDocument: (state, action) => {
            state.documents = state.documents.filter(doc => (doc.id !== action.payload));
        },
        flushEdit: state => {
            state.editContentData = null
        },
        flushDocuments: state => {
            state.documents = [];
            state.documentTypes = [];
            state.editContentData = null;
        }
    }
})

export const {saveContent, getDocuments, editContent, updateDocument, deleteDocument, flushDocuments, flushEdit, addDocumentType, getDocumentTypes} = slice.actions;


// Fetch Documents
export const fetchDocuments = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/documents/', tokenConfig(getState))
        .then(result => {
            dispatch(getDocuments(result.data));
            dispatch(getNotifications(createMessage("Documents Loaded", "info")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

export const fetchDocumentTypes = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/documentTypes', tokenConfig(getState))
        .then(result => {
            dispatch(getDocumentTypes(result.data));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        });
};

// Create Content
export const createContent = document => (dispatch, getState) => {
    axios.post(apiDataUrl + '/documents/', document, tokenConfig(getState))
        .then(result => {
            dispatch(saveContent(result.data));
            dispatch(getNotifications(createMessage("Document Saved", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

// Edit Content
export const editThisContent = (document) => (dispatch) => {
    const {id, docName, docType, docContent, isTemplate, owner} = document;
    const editDoc = {id, docName, docType, docContent, isTemplate, owner};
    // console.log(editDoc);
    dispatch(editContent(editDoc));
}

// Update Document
export const updateThisDocument = (document) => (dispatch, getState) => {
    axios.patch(apiDataUrl + `/documents/${document.id}/`, document, tokenConfig(getState))
        .then(result => {
            dispatch(updateDocument(result.data));
            dispatch(getNotifications(createMessage("Document Updated", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

// Delete Document
export const removeDocument = id => (dispatch, getState) => {
    axios
        .delete(apiDataUrl + `/documents/${id}/`, tokenConfig(getState))
        .then(result => {
            dispatch(deleteDocument(id));
            dispatch(getNotifications(createMessage("Document Deleted", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        });
};


// Create Document Type
export const createDocumentType = (type) => (dispatch, getState) => {
    axios.post(apiDataUrl + '/documentTypes/', type, tokenConfig(getState))
        .then(result => {
            dispatch(addDocumentType(result.data));
            dispatch(getNotifications(createMessage("Document Type Added", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

export default slice.reducer;