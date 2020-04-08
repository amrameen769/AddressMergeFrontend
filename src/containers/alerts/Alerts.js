import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {
    componentDidUpdate(prevProps) {
        const {notification, alert} = this.props;
        if (notification !== prevProps.notification) {
            if (notification.type === "warning") alert.error(notification.msg);
            if (notification.type === "success") alert.success(notification.msg);
        }
    }

    render() {
        return <Fragment/>
    }
}

Alerts.propTypes = {
    notification: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notification: state.messages.notification
});

export default connect(mapStateToProps)(withAlert()(Alerts));