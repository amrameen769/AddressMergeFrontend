import React, {Component} from 'react';
import './App.css';
import Routes from './containers/routes';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import {blue, indigo} from "@material-ui/core/colors";
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./app/store";
import {loadUser} from "./components/client/authSlice";

// const initialSettings = {
//     BVEL: 20,
//     SHDW: 100
// };


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: indigo[400]
        },
        primary: {
            main: blue[500]
        }
    }, typography: {
        fontFamily: ['"Comfortaa"', 'cursive'].join(',')
    }
});

//Alert Options
const alertOptions = {
    timeout: 2000,
    transition: 'fade',
    position: 'middle',
    containerStyle: {
        fontSize: '12px'
    }
};

class App extends Component {
    // const [normalStyles] = useVariableFont("Comfortaa", "normal");
    // const [customStyles, updateStyles] = useVariableFont("Comfortaa", initialSettings);

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <div className="App" >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <ThemeProvider theme={theme}>
                        <Routes/>
                    </ThemeProvider>
                </AlertProvider>
            </div>
        );
    }
}

export default App;
