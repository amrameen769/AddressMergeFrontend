import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";

const initialState = {
    sponsors: [],
    sponsorGroups: []
};

export const slice = createSlice({
    name: 'sponsors',
    initialState: initialState,
    reducers: {
        getSponsors: (state, action) => {
            state.sponsors = (action.payload);
        },
        getSponsorGroups: (state, action) => {
            state.sponsorGroups = (action.payload);
        },
        addSponsor: (state, action) => {
            state.sponsors.push(action.payload);
        },
        addSponsorGroup: (state, action) => {
            state.sponsorGroups.push(action.payload);
        },
        flushSponsors: (state) => {
            state.sponsors = [];
            state.sponsorGroups = [];
        }
    }
});

export const {getSponsors, addSponsor, flushSponsors, getSponsorGroups, addSponsorGroup} = slice.actions;

//Fetch Sponsors
export const fetchSponsors = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/core/sponsors/')
        .then(result => {
            dispatch(getNotifications(createMessage("Sponsors Loaded", "info")));
            dispatch(getSponsors(result.data))
        })
        .catch(error => {
            dispatch(getNotifications(createMessage("Network Connection Unstable", "warning")));
            console.log(error)
        });
};

//Fetch Sponsor Groups
export const fetchSponsorGroups = () => (dispatch, getState) => {
    axios.get('http://127.0.0.1:8000/api/core/sponsorGroups', tokenConfig(getState))
        .then(result => {
            dispatch(getSponsorGroups(result.data));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        });
};

// Create Sponsor
export const createSponsor = (sponsor) => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/core/sponsors/', sponsor, tokenConfig(getState))
        .then(result => {
            dispatch(addSponsor(result.data));
            dispatch(getNotifications(createMessage("Sponsor Added", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
};

// Create Sponsor Group
export const createSponsorGroup = (sponsorGroup) => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/core/sponsorGroups/', sponsorGroup, tokenConfig(getState))
        .then(result => {
            dispatch(addSponsorGroup(result.data));
            dispatch(getNotifications(createMessage("Sponsor Group Added", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

export default slice.reducer;