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

class AddDonations extends Component {
    state = {
        donationName: "",
        donationDescription: "",
        donationDate: "",
        donationAmount: "",
        donationTo: "",
        donationBy: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy} = this.state;
        const donation = {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy};

        console.log(donation);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleDateChange(donationDate) {
        this.setState({donationDate: donationDate.toString()});
    };

    render() {
        const {classes} = this.props;
        const {donationName, donationDescription, donationDate, donationAmount, donationTo, donationBy} = this.state;

        return (
            <div>
                <Container className={classes.root}>
                    <h2>Add Donations</h2>
                    <form onSubmit={this.handleSubmit} noValidate={true}>
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
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <DateAndTimeAdv selectedDate={donationDate}
                                                    onDateChange={this.handleDateChange.bind(this)}/>
                                </FormControl>
                            </Grid>
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
                                            <MenuItem value={1}>Ten</MenuItem>
                                            <MenuItem value={2}>Twenty</MenuItem>
                                            <MenuItem value={3}>Thirty</MenuItem>
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
                                            <MenuItem value={1}>Ten</MenuItem>
                                            <MenuItem value={2}>Twenty</MenuItem>
                                            <MenuItem value={3}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button startIcon={<SaveIcon/>} variant={"contained"} type={"submit"} color={"primary"}>
                                    Save
                                </Button>
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

export default withStyles(styles)(AddDonations);