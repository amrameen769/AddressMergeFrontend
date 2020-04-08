import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    error: {
        msg: {},
        status: null
    },
    notification: {
        msg: [],
        type: null
    },
};

export const slice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        getNotifications: (state, action) => {
            state.notification.msg = action.payload.msg;
            state.notification.type = action.payload.type;
        },
        getErrors: (state, action) => {
            state.error.msg = action.payload.msg;
            state.error.status = action.payload.status;
        }
    }
});

export const {getNotifications, getErrors} = slice.actions;

export function createMessage(message, type){
    return {
        msg: message,
        type: type
    };
}

export function returnErrors(message, status){
    return {
        msg: message,
        status: status
    };
}


export default slice.reducer;