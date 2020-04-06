import React from 'react';
import MaterialTableUI from "../misc/MaterialTableUI";

const columns = [
    {
        field: "id",
        title: "#"
    },
    {
        field: "donationName",
        title: "Donation Name",
    },
    {
        field: "donationDescription",
        title: "Donation Description",
    },
    {
        field: "donationDate",
        title: "Donation Date",
    },
    {
        field: "donationAmount",
        title: "Donation Amount",
    },
    {
        field: "donationBy",
        title: "Sponsor",
    },
    {
        field: "donationTo",
        title: "Candidate",
    }
];

function createDonationData(id, donationName, donationDescription, donationDate, donationAmount, donationBy, donationTo) {
    return {id, donationName, donationDescription, donationDate, donationAmount, donationBy, donationTo};
}

const rows = [
    createDonationData(1, "Annual Donation", "Donating from the Foundations of Infosys", "Mon Apr 06 2020 16:14:39 GMT+0530 (India Standard Time)", 36000, "Al Ameen AR", "Samar AR"),
    createDonationData(2, "Monthly Donation", "Donating from the Foundations of Deloitte", "Mon Apr 06 2020 17:10:39 GMT+0530 (India Standard Time)", 300000, "Gaurav Ganguli", "Samar AR"),
];

const ListDonations = (props) => {
    return (
        <div>
            <h2>Donations</h2>
            <MaterialTableUI columns={columns} data={rows} title="Donations Table"/>
        </div>
    );
};

export default ListDonations;