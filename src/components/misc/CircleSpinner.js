import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';

const CircleSpinner = (props) => {
    const {showSpinner} = props;
    return (
        <div>
            {showSpinner && (
                <CircularProgress/>
            )}
        </div>
    )
};

const mapStateToProps = state => ({
    showSpinner: state.messages.progress
})

export default connect(mapStateToProps)(CircleSpinner);
