import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {createMessage, getNotifications} from "../messages/messagesSlice";

const initialState = {
    sponsors: []
};

export const slice = createSlice({
    name: 'sponsors',
    initialState: initialState,
    reducers: {
        getSponsors: (state, action) => {
            state.sponsors = (action.payload);
        },
        addSponsor: (state, action) => {
            state.sponsors.push(action.payload);
        }
    }
});

export const {getSponsors, addSponsor} = slice.actions;

export const fetchSponsors = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/core/sponsors/')
        .then(result => {
            dispatch(getNotifications(createMessage("Sponsors Loaded", "info")));
            dispatch(getSponsors(result.data))
        })
        .catch(error => {
            dispatch(getNotifications(createMessage("Network Connection Unstable","warning")));
            console.log(error)
        });
};

export default slice.reducer;