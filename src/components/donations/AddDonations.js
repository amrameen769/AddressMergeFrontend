import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import DateAndTimeAdv from "../misc/DateAndTimeAdv";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import {returnCandidateObjects, returnSponsorObjects} from "../misc/utility";
import {connect} from "react-redux";
import {createDonation, flushEditDonationData, updateThisDonation} from "./donationsSlice";
import {sendMessage} from "../messages/messagesSlice";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import PropTypes from "prop-types";
import store from "../../app/store";

let isEqual = require('lodash.isequal');

class AddDonations extends Component {
    state = {
        donationName: "",
        donationDescription: "",
        donationDate: new Date(),
        donationAmount: "",
        donationTo: "",
        donationBy: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.editDonationData) {
            const {id, owner, donationName, donationDescription, donationAmount, donationTo, donationBy} = this.props.editDonationData;
            const editDonationData = {
                id,
                donationName,
                donationDescription,
                donationAmount,
                donationTo,
                donationBy
            };
            if (this.props.user.id === owner) {
                const {donationName, donationDescription, donationAmount, donationTo, donationBy} = this.state;
                const donation = {
                    id,
                    donationName,
                    donationDescription,
                    donationAmount,
                    donationTo,
                    donationBy
                };
                if (!isEqual(editDonationData, donation)) {
                    this.props.updateThisDonation(donation);
                } else {
                    this.props.sendMessage("Can't update Same Data", "warning");
                }
            } else {
                this.props.sendMessage("You are not authorised for this Action", "warning");
            }
        } else {
            const {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy} = this.state;
            const donation = {
                donationName,
                donationDescription,
                donationDate: donationDate === "" ? new Date() : donationDate,
                donationAmount,
                donationTo,
                donationBy
            };
            this.props.createDonation(donation);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleDateChange(donationDate) {
        this.setState({donationDate: donationDate});
    };

    handleReset = () => {
        this.setState({
            donationName: "",
            donationDescription: "",
            donationDate: "",
            donationAmount: "",
            donationTo: "",
            donationBy: "",
        });
        store.dispatch(this.props.flushEditDonationData())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editDonationData && this.props.editDonationData !== prevProps.editDonationData) {
            const {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy} = this.props.editDonationData;
            this.setState({
                donationName,
                donationDescription,
                donationDate,
                donationAmount,
                donationTo,
                donationBy
            })
        }
    }

    render() {
        const {classes} = this.props;
        const {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy} = this.state;
        return (
            <div>
                <Container className={classes.root}>
                    <h2>{this.props.editDonationData ? "Edit Donations" : "Add Donations"}</h2>
                    <form onReset={this.handleReset} onSubmit={this.handleSubmit} noValidate={true}>
                        <Grid container spacing={2} alignItems={"center"} justify={"center"}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id={"donationName"}
                                        name={"donationName"}
                                        label="Donation Name"
                                        variant={"outlined"}
                                        color={"secondary"}
                                        margin={"normal"}
                                        value={donationName}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        multiline
                                        rows={6}
                                        id={"donationDescription"}
                                        name={"donationDescription"}
                                        label="Donation Description"
                                        variant={"outlined"}
                                        color={"secondary"}
                                        margin={"normal"}
                                        value={donationDescription}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            {!this.props.editDonationData ? (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <DateAndTimeAdv selectedDate={donationDate}
                                                        onDateChange={this.handleDateChange.bind(this)}/>
                                    </FormControl>
                                </Grid>
                            ) : null}
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        inputProps={{
                                            'type': 'number'
                                        }}
                                        id={"donationAmount"}
                                        name={"donationAmount"}
                                        label="Donation Amount"
                                        variant={"outlined"}
                                        color={"secondary"}
                                        margin={"normal"}
                                        value={donationAmount}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid container item spacing={2} direction="row" alignItems={"center"}
                                  justify={"space-between"}>
                                <Grid item xs={12} xl={6}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="SponsorLabel">Sponsor Name</InputLabel>
                                        <Select
                                            labelId="SponsorLabel"
                                            name={"donationBy"}
                                            value={donationBy}
                                            onChange={this.handleChange}
                                            label="Sponsor Name"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.props.sponsors.map(sponsor => (
                                                <MenuItem key={sponsor.id} value={sponsor.id}>{sponsor.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} xl={6}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="candidateLabel">Candidate Name</InputLabel>
                                        <Select
                                            labelId="candidateLabel"
                                            name={"donationTo"}
                                            value={donationTo}
                                            onChange={this.handleChange}
                                            label="Candidate Name"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.props.candidates.map(candidate => (
                                                <MenuItem key={candidate.id}
                                                          value={candidate.id}>{candidate.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.saveButton}>
                                    <Button startIcon={<SaveIcon/>} variant={"contained"} type={"submit"}
                                            color={"primary"}>
                                        Save
                                    </Button>
                                </FormControl>
                                {this.props.editDonationData && (
                                    <FormControl className={classes.saveButton}>
                                        <Button startIcon={<ClearAllIcon/>} type={"reset"} color={"secondary"}
                                                variant={"contained"}>
                                            Clear
                                        </Button>
                                    </FormControl>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
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

AddDonations.propTypes = {
    candidates: PropTypes.array.isRequired,
    sponsors: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    createDonation: PropTypes.func.isRequired,
    updateThisDonation: PropTypes.func.isRequired,
    flushEditDonationData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    candidates: state.candidates.candidates.map(candidate => returnCandidateObjects(candidate)),
    sponsors: state.sponsors.sponsors.map(sponsor => returnSponsorObjects(sponsor)),
    editDonationData: state.donations.editDonationData,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    createDonation,
    updateThisDonation,
    sendMessage,
    flushEditDonationData
})(withStyles(styles)(AddDonations));