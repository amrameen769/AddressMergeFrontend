import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {returnErrors, getErrors} from "../messages/messagesSlice";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        userLoading: (state) => {
            state.isLoading = true;
        },
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        authError: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    }
});

export const {userLoading, userLoaded, authError, loginSuccess} = slice.actions;

//Setup config with token - helper function
export const tokenConfig = getState => {
    //Get Token from State
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //If Token, add to Headers Config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};

//Load Users
export const loadUser = () => (dispatch, getState) => {
    dispatch(userLoading());
    axios.get('http://127.0.0.1:8000/api/clients/auth/client', tokenConfig(getState))
        .then(result => {
            console.log(result.data);
            dispatch(userLoaded(result.data))
        })
        .catch(error => {
            dispatch(authError());
            dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
        })
};

//Login User
export const loginUser = (username, password) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({username, password});
    axios.post('http://127.0.0.1:8000/api/clients/auth/login', body, config)
        .then(result => {
            console.log(result.data);
            dispatch(loginSuccess(result.data))
        })
        .catch(error => {
            dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
            dispatch(authError());
        })
};

//Logout User
export const logoutUser = () => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/api/clients/auth/logout', null, tokenConfig(getState))
        .then(result => {
            dispatch(authError())
        })
        .catch(error => {
            dispatch(getErrors(returnErrors(error.response.data, error.response.status)));
        })
};

export default slice.reducer;