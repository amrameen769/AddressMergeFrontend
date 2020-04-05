import React from 'react';
import PropTypes from 'prop-types';
import DataTable from "../misc/TableUI";
import {Checkbox} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
        id: 'id', label: '#', minWidth: 30,
        format: value => (value)
    },
    {
        id: 'fullName', label: 'Name', minWidth: 170,
        format: value => (value)
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'phoneNo',
        label: 'Phone Number',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'city',
        label: 'City',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'country',
        label: 'Country',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'region',
        label: 'State',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'zip',
        label: 'Zip Code',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'candidateCategory',
        label: 'Category',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'sponsor',
        label: 'Sponsor Name',
        minWidth: 170,
        align: 'left',
        format: value => (value)
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 50,
        align: 'center',
        format: (value) => {
            return <Checkbox readOnly checked={value}/>
        },
    },
    {
        id: 'edit-delete',
        label: 'Edit/Delete',
        minWidth: 170,
        align: 'center',
        format: (value) => {
            return (
                <div>
                    <Button id={value} color={"primary"} variant={"outlined"}
                            onClick={() => console.log("Edit")}>Edit</Button>
                    <Button id={value} color={"primary"} variant={"outlined"}
                            onClick={() => console.log("Delete")}>Delete</Button>
                </div>
            )
        }
    },
];

const rows = [
    createCandidateData(1, "Samar", "AR", "samarar@gmail.com", 12456875, "1234 Main Street", "India", "Kerala", "Tvm", "695609", "12:43AM", true, "Student", "amrameen769", "Al Ameen AR"),
];

const ListCandidates = props => {
    return (
        <div>
            <h2>Candidates</h2>
            <DataTable columns={columns} rows={rows}/>
        </div>
    );
};

ListCandidates.propTypes = {};

export default ListCandidates;