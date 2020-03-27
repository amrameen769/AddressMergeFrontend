import React, {Component} from 'react';
import Launcher from "./Launcher";
import bg_addr from "./images/bg_addr.jpg";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{backgroundImage: `url(${bg_addr})`}}>
                    <Launcher/>
                </div>
            </React.Fragment>
        );
    }
}

Home.propTypes = {};

export default Home;