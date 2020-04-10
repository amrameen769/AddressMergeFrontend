import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/styles";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddCategory from "../misc/AddCategory";
import {createSponsor, createSponsorGroup, fetchSponsorGroups, updateThisSponsor, updateSponsor} from "./sponsorsSlice";
import PropTypes from 'prop-types';
import {sendMessage} from "../messages/messagesSlice";
import store from "../../app/store";
import ClearAllIcon from '@material-ui/icons/ClearAll';

class AddSponsors extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        address: "",
        country: "",
        region: "",
        city: "",
        zip: "",
        sponsorGroup: ""
    };
    selectCountry = (country) => {
        this.setState({country});
    };
    selectRegion = (region) => {
        this.setState({region});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.editData) {
            const {id, owner} = this.props.editData;
            if (this.props.user.id === owner) {
                const {firstName, lastName, email, phoneNo, address, country, region, city, zip, sponsorGroup} = this.state;
                const sponsor = {
                    id,
                    firstName,
                    lastName,
                    email,
                    phoneNo,
                    address,
                    country,
                    region,
                    city,
                    zip,
                    sponsorGroup
                };
                this.props.updateThisSponsor(sponsor);
            } else {
                this.props.sendMessage("You Are not Authenticated");
            }
        } else {
            const {firstName, lastName, email, phoneNo, address, country, region, city, zip, sponsorGroup} = this.state;
            const sponsor = {
                firstName,
                lastName,
                email,
                phoneNo,
                address,
                country,
                region,
                city,
                zip,
                sponsorGroup
            };
            this.props.createSponsor(sponsor);
        }

        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            address: "",
            country: "",
            region: "",
            city: "",
            zip: "",
            sponsorGroup: ""
        })
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    componentDidMount() {
        this.props.fetchSponsorGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editData && prevProps.editData !== this.props.editData) {
            const {firstName, lastName, email, phoneNo, address, country, region, city, zip, sponsorGroup} = this.props.editData;
            this.setState({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                address: address,
                country: country,
                region: region,
                city: city,
                zip: zip,
                sponsorGroup: sponsorGroup
            })
        }
    }

    handleReset = (event) => {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            address: "",
            country: "",
            region: "",
            city: "",
            zip: "",
            sponsorGroup: ""
        });
        store.dispatch(updateSponsor())
    }

    render() {
        const {classes, sponsorGroups} = this.props;
        const {firstName, lastName, email, phoneNo, address, country, region, city, zip, sponsorGroup} = this.state;
        return (
            <Container className={classes.root}>
                {this.props.editData ? (<h2>Edit Sponsors</h2>) : (<h2>Add Sponsors</h2>)}
                <form onReset={this.handleReset} onSubmit={this.handleSubmit} noValidate={true}>
                    <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={firstName}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={lastName}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={email}
                                    type={"email"}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    inputProps={{
                                        'minLength': 6,
                                        'type': 'tel'
                                    }}
                                    margin={"normal"}
                                    required
                                    id="phoneNo"
                                    name="phoneNo"
                                    label="Phone Number"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={phoneNo}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" direction={"row"} justify={"center"}>
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    id="address"
                                    name="address"
                                    label="Address"
                                    multiline
                                    rows="4"
                                    placeholder={"1234 Main St"}
                                    variant="outlined"
                                    required
                                    value={address}
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" direction={"row"} justify={"center"}>
                        <Grid item xs={12} xl={3}>
                            <FormControl fullWidth>
                                <CountryDropdown
                                    className={classes.dropDown}
                                    value={country}
                                    onChange={this.selectCountry}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={3}>
                            <FormControl fullWidth>
                                <RegionDropdown
                                    className={classes.dropDown}
                                    disableWhenEmpty={true}
                                    country={country}
                                    value={region}
                                    onChange={this.selectRegion}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={3}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={city}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} xl={3}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    name="zip"
                                    id="zip"
                                    label="Zip Code"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.handleChange}
                                    value={zip}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" direction={"row"} justify={"center"}>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="sponsorGroupLabel">Sponsor Group</InputLabel>
                                <Select
                                    labelId="sponsorGroupLabel"
                                    name={"sponsorGroup"}
                                    value={sponsorGroup}
                                    onChange={this.handleChange}
                                    label="Sponsor Group"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {sponsorGroups.map(group => (
                                        <MenuItem key={group.id} value={group.id}>{group.groupName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <AddCategory name={"sponsor-group"} action={"Add Sponsor Group"}
                                         method={this.props.createSponsorGroup}/>
                        </Grid>
                    </Grid>
                    <FormControl className={classes.saveButton}>
                        <Button startIcon={<SaveIcon/>} type={"submit"} color={"primary"} variant={"contained"}>
                            Save
                        </Button>
                    </FormControl>
                    {this.props.editData && (
                        <FormControl className={classes.saveButton}>
                            <Button startIcon={<ClearAllIcon/>} type={"reset"} color={"secondary"} variant={"contained"}>
                                Clear
                            </Button>
                        </FormControl>
                    )}
                </form>
            </Container>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    saveButton: {
        margin: theme.spacing(2)
    },
    dropDown: {
        height: theme.spacing(7),
        marginTop: "8px",
        align: 'center'
    },
    form: {
        width: "auto"
    }
});

AddSponsors.propTypes = {
    createSponsorGroup: PropTypes.func.isRequired,
    createSponsor: PropTypes.func.isRequired,
    sponsorGroups: PropTypes.array,
    editData: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    fetchSponsorGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    sponsorGroups: state.sponsors.sponsorGroups,
    editData: state.sponsors.editData,
});

export default connect(mapStateToProps, {
    createSponsor,
    createSponsorGroup,
    fetchSponsorGroups,
    updateThisSponsor,
    sendMessage
})(withStyles(styles)(AddSponsors));