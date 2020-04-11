import React from 'react';
import MaterialTableUI from "../misc/MaterialTableUI";
import {connect} from 'react-redux';
import {returnArrayData} from "../misc/utility";
import {editThisDonation, removeDonation} from "./donationsSlice";

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
        type: 'numeric'
    },
    {
        field: "donSponsorName",
        title: "Sponsor",
    },
    {
        field: "donCandidateName",
        title: "Candidate",
    }
];

const ListDonations = (props) => {
    const rows = returnArrayData(props.donations);
    return (
        <div>
            <h2>Donations</h2>
            <MaterialTableUI columns={columns} data={rows} title="Donations Table" deleteMethod={props.removeDonation}
                             editMethod={props.editThisDonation}/>
        </div>
    );
};

const mapStateToProps = state => ({
    donations: state.donations.donations
})

export default connect(mapStateToProps, {removeDonation, editThisDonation})(ListDonations);