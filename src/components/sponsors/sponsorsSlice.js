import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    sponsors: []
};

export const slice = createSlice({
    name: 'sponsors',
    initialState: initialState,
    reducers: {
        getSponsors: (state, action) => {
            state.sponsors = (action.payload)
        },
        addSponsor: (state, action) => {
            state.sponsors.push(action.payload)
        }
    }
});

export const {getSponsors, addSponsor} = slice.actions;

export const fetchSponsors = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/core/sponsors/')
        .then(response => {
            dispatch(getSponsors(response.data))
        }).catch(error => {
        console.log(error)
    });
};

export default slice.reducer;