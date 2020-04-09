import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
    componentDidUpdate(prevProps) {
        const {notification, error, alert} = this.props;
        if (notification !== prevProps.notification) {
            if (notification.type === "warning") alert.error(notification.msg);
            if (notification.type === "success") alert.success(notification.msg);
            if (notification.type === "info") alert.info(notification.msg);
        }

        if (error !== prevProps.error) {
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join('\n'));
        }

    }

    render() {
        return <Fragment/>
    }
}

Alerts.propTypes = {
    notification: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notification: state.messages.notification,
    error: state.messages.error
});

export default connect(mapStateToProps)(withAlert()(Alerts));