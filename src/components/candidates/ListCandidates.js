import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from "@material-ui/core";
import MaterialTableUI from "../misc/MaterialTableUI";

function createCandidateData(id, firstName, lastName, email, phoneNo, address, country, region, city, zip, createdAt, status, candidateCategory, owner, sponsor) {
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
        createdAt,
        status,
        candidateCategory,
        owner,
        sponsor
    }
}

const columns = [
    {
        field: 'id', title: '#'
    },
    {
        field: 'fullName', title: 'Name'
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
        field: 'candidateCategory',
        title: 'Category',
    },
    {
        field: 'sponsor',
        title: 'Sponsor Name',
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
    createCandidateData(1, "Samar", "AR", "samarar@gmail.com", 12456875, "1234 Main Street", "India", "Kerala", "Tvm", "695609", "12:43AM", true, "Student", "amrameen769", "Al Ameen AR"),
];

const ListCandidates = props => {
    return (
        <div>
            <h2>Candidates</h2>
            <MaterialTableUI columns={columns} data={rows} title="Candidates Table"/>
        </div>
    );
};

ListCandidates.propTypes = {};

export default ListCandidates;