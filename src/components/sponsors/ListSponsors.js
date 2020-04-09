import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox} from "@material-ui/core";
import MaterialTableUI from "../misc/MaterialTableUI";
import PropTypes from 'prop-types';
import {returnArrayData} from "../misc/utility";

const columns = [
    {
        field: 'id', title: '#'
    },
    {
        field: 'fullName', title: 'Name',
        render: rowData => {
            return rowData.firstName + ' ' + rowData.lastName;
        }
    },
    {
        field: 'email',
        title: 'Email',
    },
    {
        field: 'phoneNo',
        title: 'Phone Number',
    },
    {
        field: 'address',
        title: 'Address',
    },
    {
        field: 'city',
        title: 'City',
    },
    {
        field: 'country',
        title: 'Country',
    },
    {
        field: 'region',
        title: 'State',
    },
    {
        field: 'zip',
        title: 'Zip Code',
    },
    {
        field: 'createdAt',
        title: 'Created At',
    },
    {
        field: 'sponsorGroupName',
        title: 'Group Name',
    },
    {
        field: 'status',
        title: 'Status',
        render: (rowData) => {
            return <Checkbox readOnly checked={rowData.status}/>
        },
    }
];

class ListSponsors extends Component {
    render() {
        const {sponsors} = this.props;
        const rows = returnArrayData(sponsors);
        return (
            <div>
                <h2>Sponsors</h2>
                <MaterialTableUI columns={columns} data={rows} title={"Sponsors Table"}/>
            </div>
        );
    }
}

ListSponsors.propTypes = {
    sponsors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    sponsors: state.sponsors.sponsors
});

export default connect(mapStateToProps)(ListSponsors);