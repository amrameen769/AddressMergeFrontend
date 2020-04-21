import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import ManageSponsors from "../components/sponsors/ManageSponsors";
import ManageCandidates from "../components/candidates/ManageCandidates";
import ManageDonations from "../components/donations/ManageDonations";
import {fetchSponsors} from "../components/sponsors/sponsorsSlice";
import {connect} from "react-redux";
import {withTheme} from '@material-ui/core/styles';
import {fetchCandidates} from "../components/candidates/candidateSlice";
import {fetchDonations} from "../components/donations/donationsSlice";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    tabHead: {
        fontWeight: 600
    }
});

class AddressBook extends Component {
    state = {
        value: 0
    };

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    };

    handleChangeIndex = index => {
        this.setState({
            value: index
        });
    };

    componentDidMount() {
        this.props.fetchSponsors();
        this.props.fetchCandidates();
        this.props.fetchDonations();
    }

    render() {
        const {classes} = this.props;
        const {theme} = this.props;
        const {value} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab className={classes.tabHead} label="Manage Sponsors" {...a11yProps(0)} />
                        <Tab className={classes.tabHead} label="Manage Candidates" {...a11yProps(1)} />
                        <Tab className={classes.tabHead} label="Manage Donations" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <ManageSponsors/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ManageCandidates/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <ManageDonations/>
                    </TabPanel>
                </SwipeableViews>
            </div>
        );
    }
}

AddressBook.propTypes = {
    fetchSponsors: PropTypes.func.isRequired,
    fetchCandidates: PropTypes.func.isRequired,
    fetchDonations: PropTypes.func.isRequired,
}

export default connect(null, {
    fetchSponsors,
    fetchCandidates,
    fetchDonations
})(withTheme(withStyles(styles)(AddressBook)));