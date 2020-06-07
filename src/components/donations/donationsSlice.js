import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {tokenConfig} from "../client/authSlice";
import {createMessage, getErrors, getNotifications, returnErrors} from "../messages/messagesSlice";
import {apiDataUrl} from "../misc/utility";

const initialState = {
    donations: [],
    editDonationData: null
}

export const slice = createSlice({
    name: "donations",
    initialState: initialState,
    reducers: {
        getDonations: (state, action) => {
            state.donations = action.payload
        },
        addDonation: (state, action) => {
            state.donations.unshift(action.payload)
        },
        deleteDonation: (state, action) => {
            state.donations = state.donations.filter(donation => donation.id !== action.payload)
        },
        updateDonation: (state, action) => {
            const donationIndex = state.donations.findIndex(donation => donation.id === action.payload.id);
            state.donations[donationIndex] = action.payload;
        },
        editDonation: (state, action) => {
            state.editDonationData = action.payload
        },
        flushDonations: state => {
            state.donations = [];
            state.editDonationData = null;
        },
        flushEditDonationData: state => {
            state.editDonationData = null;
        }
    }
})

export const {getDonations, addDonation, deleteDonation, updateDonation, editDonation, flushDonations, flushEditDonationData} = slice.actions;

// Add Donation
export const createDonation = (donation) => (dispatch, getState) => {
    axios.post(apiDataUrl + '/donations/', donation, tokenConfig(getState))
        .then(result => {
            dispatch(addDonation(result.data));
            dispatch(getNotifications(createMessage("Donation Added", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

// Fetch Donations
export const fetchDonations = () => (dispatch, getState) => {
    axios.get(apiDataUrl + '/donations', tokenConfig(getState))
        .then(result => {
            dispatch(getDonations(result.data));
            dispatch(getNotifications(createMessage("Donations loaded", "info")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

// Delete Donation
export const removeDonation = (id) => (dispatch, getState) => {
    axios.delete(apiDataUrl + `/donations/${id}`, tokenConfig(getState))
        .then(result => {
            dispatch(deleteDonation(id));
            dispatch(getNotifications(createMessage("Donation deleted", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

// Edit Donation
export const editThisDonation = (rowData) => (dispatch) => {
    const {id, donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy, owner} = rowData;
    const donation = {id, donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy, owner};
    dispatch(editDonation(donation));
}

// Update Donation
export const updateThisDonation = (donation) => (dispatch, getState) => {
    axios.patch(apiDataUrl + `/donations/${donation.id}/`, donation, tokenConfig(getState))
        .then(result => {
            dispatch(updateDonation(result.data));
            dispatch(getNotifications(createMessage("Donation Updated", "success")));
        })
        .catch(error => {
            if (error.response) dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            else dispatch(getNotifications(createMessage("Network Error", "warning")));
        })
}

export default slice.reducer;