import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
// import bg_addr from '../../containers/images/bg_addr.jpg';

const styles = theme => ({
    root: {
        height: '93vh',
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    image: {
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        // backgroundImage: `url(${bg_addr})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: 'auto', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    grid: {
        margin: theme.spacing(2)
    }
});

class Login extends Component {
    state = {
        email: "",
        password: "",
        remember: false
    };

    copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" to={"/"}>
                    AddressMerge
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    checkOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form onSubmit={this.handleSubmit} className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.handleOnChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleOnChange}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.checkOnChange}
                                            color="primary"
                                            name={"remember"}
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid>
                                    <Grid className={classes.grid} item xs>
                                        <Link to={"/reset-password"} className={classes.link}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid className={classes.grid} item>
                                        <Link to={"/register"} className={classes.link}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    {this.copyright()}
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Login));