import React, {Component} from 'react';
import Reports from "./Dashboard/Reports";

class DashboardMerger extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Reports/>
            </div>
        );
    }
}

export default DashboardMerger;