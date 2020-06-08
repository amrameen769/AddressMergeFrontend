import React, {Component} from 'react';
import {connect} from 'react-redux';
import SimpleCard from "./SimpleCard";

class Reports extends Component {
    render() {
        return (
            <div>
                <SimpleCard
                    amount={125400}
                    heading={"Total Donation "}
                />
            </div>
        );
    }
}


export default connect(null, {})(Reports);
