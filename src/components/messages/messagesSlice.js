import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    error: {},
    notification: {}
};

export const slice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        getNotifications: (state, action) => {
            state.notification = action.payload;
            // state.notification.type = action.payload.type;
        },
        getErrors: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {getNotifications, getErrors} = slice.actions;

export function createMessage(message, type) {
    return {
        msg: message,
        type: type
    };
}

export const sendMessage = (message, type) => (dispatch) => {
    dispatch(getNotifications(createMessage(message, type)));
};

export function returnErrors(message, status) {
    return {
        msg: message,
        status: status
    };
}


export default slice.reducer;