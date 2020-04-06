import React from 'react';
import {connect} from 'react-redux';
import {Checkbox} from "@material-ui/core";
import MaterialTableUI from "../misc/MaterialTableUI";

const columns = [
    {
        field: 'id', title: '#'
    },
    {
        field: 'fullName', title: 'Name',
    },
    {
        field: 'email',
        title: 'Email',
        format: value => (value)
    },
    {
        field: 'phoneNo',
        title: 'Phone Number',
        format: value => (value)
    },
    {
        field: 'address',
        title: 'Address',
        format: value => (value)
    },
    {
        field: 'city',
        title: 'City',
        format: value => (value)
    },
    {
        field: 'country',
        title: 'Country',
        format: value => (value)
    },
    {
        field: 'region',
        title: 'State',
        format: value => (value)
    },
    {
        field: 'zip',
        title: 'Zip Code',
        format: value => (value)
    },
    {
        field: 'createdAt',
        title: 'Created At',
        format: value => (value)
    },
    {
        field: 'sponsorGroup',
        title: 'Group Name',
        format: value => (value)
    },
    {
        field: 'status',
        title: 'Status',
        render: (rowData) => {
            return <Checkbox readOnly checked={rowData.status}/>
        },
    }
];

const rows = [
    createSponsorData(1, 'Al Ameen', 'AR', 'amrameen769@gmail.com', '7025886445', '1234 Main Street', 'India', 'Kerala', 'Thiruvananthapuram',
        152634, true, "Mon Apr 06 2020 16:14:39 GMT+0530 (India Standard Time)", 'International'),
];

function createSponsorData(id, firstName, lastName, email, phoneNo, address, country, region, city, zip, status, createdAt, sponsorGroup) {
    return {
        id,
        fullName: firstName + " " + lastName,
        email,
        phoneNo,
        address,
        country,
        region,
        city,
        zip,
        status,
        createdAt,
        sponsorGroup
    };
}

const ListSponsors = props => {
    return (
        <div>
            <h2>Sponsors</h2>
            <MaterialTableUI columns={columns} data={rows} title={"Sponsors Table"}/>
        </div>
    );
};

ListSponsors.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(ListSponsors);