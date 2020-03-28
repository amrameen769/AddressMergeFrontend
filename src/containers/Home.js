import React, {Component} from 'react';
import Launcher from "./Launcher";
import bg_home from "./images/bg_home.jpg";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{backgroundImage: `url(${bg_home})`}}>
                    <Launcher/>
                </div>
            </React.Fragment>
        );
    }
}

Home.propTypes = {};

export default Home;