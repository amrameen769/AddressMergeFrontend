import React from 'react';
import './App.css';
import Routes from './containers/routes';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import {blue, indigo} from "@material-ui/core/colors";
import useVariableFont from "react-variable-fonts";

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
    },typography: {
        fontFamily: ['"Comfortaa"', 'cursive'].join(',')
    }
});

function App() {
    const [normalStyles] = useVariableFont("Comfortaa", "normal");
    // const [customStyles, updateStyles] = useVariableFont("Comfortaa", initialSettings);

    return (
        <div className="App" style={{...normalStyles}}>
            <ThemeProvider theme={theme}>
                <Routes/>
            </ThemeProvider>
        </div>
    );
}

export default App;
