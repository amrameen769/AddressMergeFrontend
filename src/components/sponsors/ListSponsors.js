import React from 'react';
import DataTable from "../misc/TableUI";
import {connect} from 'react-redux';
import {Checkbox} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const columns = [
    {
        id: 'id', label: '#', minWidth: 30,
        format: value => (value)
    },
    {
        id: 'firstName', label: 'First Name', minWidth: 170,
        format: value => (value)
    },
    {
        id: 'lastName', label: 'Last Name', minWidth: 100,
        format: value => (value)
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'phoneNo',
        label: 'Phone Number',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'city',
        label: 'City',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'country',
        label: 'Country',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'region',
        label: 'State',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'zip',
        label: 'Zip Code',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'sponsorGroup',
        label: 'Group Name',
        minWidth: 170,
        align: 'right',
        format: value => (value)
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'right',
        format: (value) => {
            return <Checkbox readOnly checked={value}/>
        },
    },
    {
        id: 'edit-delete',
        label: 'Edit/Delete',
        minWidth: 170,
        align: 'right',
        format: (value) => {
            return (
                <div>
                    <Button id={value} color={"primary"} variant={"outlined"} onClick={() => console.log("Edit")}>Edit</Button>
                    <Button id={value} color={"primary"} variant={"outlined"} onClick={() => console.log("Delete")}>Delete</Button>
                </div>
            )
        }
    },
];

const rows = [
    createData(1, 'Al Ameen', 'AR', 'amrameen769@gmail.com', '7025886445', '1234 Main Street', 'India', 'Kerala', 'Tvm',
        152634, true, 'International'),
];

function createData(id, firstName, lastName, email, phoneNo, address, country, region, city, zip, status, sponsorGroup) {
    return {id, firstName, lastName, email, phoneNo, address, country, region, city, zip, status, sponsorGroup};
}

const ListSponsors = props => {
    return (
        <div>
            <h2>Sponsors</h2>
            <DataTable columns={columns} rows={rows}/>
        </div>
    );
};

ListSponsors.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(ListSponsors);