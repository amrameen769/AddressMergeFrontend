import React, {Component} from 'react';
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCategory from "../misc/AddCategory";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

class AddCandidates extends Component {
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
        candidateCategory: "",
        sponsor: ""
    };

    selectCountry = (country) => {
        this.setState({country})
    };

    selectRegion = (region) => {
        this.setState({region})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {firstName, lastName, email, phoneNo, address, country, region, city, zip, candidateCategory, sponsor} = this.state;
        const candidate = {
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            country,
            region,
            city,
            zip,
            candidateCategory,
            sponsor
        };
        console.log(candidate);
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
            candidateCategory: "",
            sponsor: ""
        })
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes} = this.props;
        const {firstName, lastName, email, phoneNo, address, country, region, city, zip, candidateCategory, sponsor} = this.state;
        return (
            <Container className={classes.root}>
                <h2>Add Candidates</h2>
                <form onSubmit={this.handleSubmit} noValidate={true}>
                    <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                        <Grid item xs={12} xl={6}>
                            <FormControl fullWidth>
                                <TextField
                                    margin={"normal"}
                                    required
                                    id={"firstName"}
                                    name={"firstName"}
                                    label={"First Name"}
                                    variant={"outlined"}
                                    color={"secondary"}
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
                    <Grid container spacing={2} alignItems="center" direction={"row"} justify={"space-between"}>
                        <Grid container spacing={1} alignItems="center" direction={"row"} justify={"space-between"} item
                              xl={6} xs={11}>
                            <Grid item xl={10} xs={10}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="candidateCategoryLabel">Candidate Category</InputLabel>
                                    <Select
                                        labelId="candidateCategoryLabel"
                                        name={"candidateCategory"}
                                        value={candidateCategory}
                                        onChange={this.handleChange}
                                        label="Candidate Category"
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
                            <Grid item xl={2} xs={2}>
                                <AddCategory name={"candidate-category"} action={"Add Candidate Category"}
                                             method={(data) => {
                                                 console.log(data)
                                             }}/>
                            </Grid>
                        </Grid>
                        <Grid item xl={6} xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="sponsorLabel">Sponsor</InputLabel>
                                <Select
                                    labelId="sponsorLabel"
                                    name={"sponsor"}
                                    value={sponsor}
                                    onChange={this.handleChange}
                                    label="Sponsor"
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
                    <FormControl className={classes.saveButton}>
                        <Button startIcon={<SaveIcon/>} type={"submit"} color={"primary"} variant={"contained"}>
                            Save
                        </Button>
                    </FormControl>
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

export default connect(null, {})(withStyles(styles)(AddCandidates));