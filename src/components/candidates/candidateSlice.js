import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createMessage, returnErrors, getErrors, getNotifications} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";

const initialState = {
    candidates: [],
    candidateCategory: [],
    editCandidateData: null,
}
export const slice = createSlice({
    name: 'candidates',
    initialState: initialState,
    reducers: {
        getCandidates: (state, action) => {
            state.candidates = action.payload
        },
        addCandidate: (state, action) => {
            state.candidates.unshift(action.payload)
        },
        deleteCandidate: (state, action) => {
            state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload)
        },
        editCandidate: (state, action) => {
            state.editCandidateData = action.payload
        },
        updateCandidate: (state, action) => {
            const candidateIndex = state.candidates.findIndex(candidate => candidate.id === action.payload.id);
            state.candidates[candidateIndex] = action.payload;
        },
        getCandidateCategory: (state, action) => {
            state.candidateCategory = action.payload
        },
        flushCandidates: (state) => {
            state.candidates = [];
            state.candidateCategory = [];
            state.editCandidateData = null;
        },
        flushEditCandidate: (state) => {
            state.editCandidateData = null;
        },
        addCandidateCategory: (state, action) => {
            state.candidateCategory.push(action.payload)
        }
    }
});

export const {getCandidates, addCandidate, editCandidate, updateCandidate, deleteCandidate, getCandidateCategory, addCandidateCategory, flushCandidates, flushEditCandidate} = slice.actions;

// Get Candidates
export const fetchCandidates = () => (dispatch, getState) => {
    axios.get('http://127.0.0.1:8000/api/core/candidates', tokenConfig(getState))
        .then(result => {
            dispatch(getCandidates(result.data));
            dispatch(fetchCandidateCategory());
            dispatch(getNotifications(createMessage("Candidates Loaded", "info")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

// Get Candidates Category
export const fetchCandidateCategory = () => (dispatch, getState) => {
    axios.get('http://127.0.0.1:8000/api/core/candidateCategory', tokenConfig(getState))
        .then(result => {
            dispatch(getCandidateCategory(result.data));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

//Add Candidate Category
export const createCandidateCategory = (category) => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/core/candidateCategory/', category, tokenConfig(getState))
        .then(result => {
            dispatch(addCandidateCategory(result.data));
            dispatch(getNotifications(createMessage("Category Added", "success")))
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

//Add Candidate
export const createCandidate = (candidate) => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/core/candidates/', candidate, tokenConfig(getState))
        .then(result => {
            dispatch(addCandidate(result.data));
            dispatch(getNotifications(createMessage("Candidate Added", "success")))
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

//Edit Candidate
export const editThisCandidate = (rowData) => (dispatch) => {
    const {id, firstName, lastName, email, phoneNo, address, country, region, city, zip, owner, candidateCategory, sponsor} = rowData;
    const candidate = {
        id,
        firstName,
        lastName,
        email,
        phoneNo,
        address,
        country,
        region,
        city,
        zip,
        owner,
        candidateCategory,
        sponsor
    };
    dispatch(editCandidate(candidate));
}

// Update Candidate
export const updateThisCandidate = (candidate) => (dispatch, getState) => {
    axios.put(`http://127.0.0.1:8000/api/core/candidates/${candidate.id}/`, candidate, tokenConfig(getState))
        .then(result => {
            dispatch(updateCandidate(result.data));
            dispatch(flushEditCandidate());
            dispatch(getNotifications(createMessage("Candidate Updated", "success")))
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

// Delete Candidate
export const removeCandidate = (id) => (dispatch, getState) => {
    axios.delete(`http://127.0.0.1:8000/api/core/candidates/${id}`, tokenConfig(getState))
        .then(result => {
            dispatch(deleteCandidate(id));
            dispatch(getNotifications(createMessage("Candidate deleted", "success")))
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

export default slice.reducer;