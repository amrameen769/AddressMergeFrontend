import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {tokenConfig} from "../client/authSlice";
import {apiDataUrl} from "../misc/utility";

const initialState = {
    sponsors: [],
    sponsorGroups: [],
    editSponsorData: null
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
            state.sponsors.unshift(action.payload);
        },
        addSponsorGroup: (state, action) => {
            state.sponsorGroups.push(action.payload);
        },
        editSponsor: (state, action) => {
            state.editSponsorData = action.payload
        },
        flushEditSponsor: (state) => {
            state.editSponsorData = null
        },
        updateSponsor: (state, action) => {
            state.editSponsorData = null;
            const sponsorIndex = state.sponsors.findIndex(sponsor => sponsor.id === action.payload.id);
            state.sponsors[sponsorIndex] = action.payload
        },
        deleteSponsor: (state, action) => {
            state.sponsors = state.sponsors.filter(
                sponsor => sponsor.id !== action.payload
            )
        },
        flushSponsors: (state) => {
            state.sponsors = [];
            state.sponsorGroups = [];
            state.editSponsorData = null;
        }
    }
});

export const {getSponsors, addSponsor, flushSponsors, getSponsorGroups, addSponsorGroup, deleteSponsor, editSponsor, updateSponsor, flushEditSponsor} = slice.actions;

export const fetchSponsors = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/sponsors/', tokenConfig(getState))
        .then(result => {
            dispatch(getNotifications(createMessage("Sponsors Loaded", "info")));
            dispatch(fetchSponsorGroups());
            dispatch(getSponsors(result.data));
        })
        .catch(error => {
            dispatch(getNotifications(createMessage("Network Connection Unstable", "warning")));
            console.log(error)
        });
};

//Fetch Sponsor Groups
export const fetchSponsorGroups = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/sponsorGroups', tokenConfig(getState))
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
    axios.post(apiDataUrl + '/sponsors/', sponsor, tokenConfig(getState))
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
    axios.post(apiDataUrl + '/sponsorGroups/', sponsorGroup, tokenConfig(getState))
        .then(result => {
            dispatch(addSponsorGroup(result.data));
            dispatch(getNotifications(createMessage("Sponsor Group Added", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

//Edit Sponsor
export const editThisSponsor = (rowData) => (dispatch) => {
    const {id, firstName, lastName, email, phoneNo, address, country, region, city, zip, owner, sponsorGroup} = rowData;
    const sponsor = {id, firstName, lastName, email, phoneNo, address, country, region, city, zip, owner, sponsorGroup};
    dispatch(editSponsor(sponsor));
}

//Update Sponsor
export const updateThisSponsor = (sponsor) => (dispatch, getState) => {
    axios.patch(apiDataUrl + `/sponsors/${sponsor.id}/`, sponsor, tokenConfig(getState))
        .then(result => {
            // dispatch(fetchSponsors());
            dispatch(updateSponsor(result.data));
            dispatch(getNotifications(createMessage("Sponsor Updated", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")))
        })
}

//Delete Sponsor
export const removeSponsor = id => (dispatch, getState) => {
    axios
        .delete(apiDataUrl + `/sponsors/${id}/`, tokenConfig(getState))
        .then(result => {
            dispatch(deleteSponsor(id));
            dispatch(getNotifications(createMessage("Sponsor Deleted", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        });
};

export default slice.reducer;