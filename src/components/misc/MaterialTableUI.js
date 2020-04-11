import React from 'react';
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {handleBackClick} from "./utility";

function MaterialTableUI(props) {

    const {columns, data, title, user, editMethod, deleteMethod} = props;
    return (
        <Container maxWidth={"xl"}>
            <MaterialTable
                title={title}
                columns={columns}
                data={data}
                options={{
                    sorting: true
                }}
                actions={[
                    rowData => ({
                        icon: "edit",
                        tooltip: "Edit",
                        onClick: (event, rowData) => {
                            editMethod(rowData);
                            handleBackClick(event);
                        },
                        disabled: rowData.owner !== user.id
                    }),
                    rowData => ({
                        icon: "delete",
                        tooltip: "Delete",
                        onClick: (event, rowData) => {
                            deleteMethod(rowData.id);
                        },
                        disabled: rowData.owner !== user.id
                    })
                ]}
            />
        </Container>
    );
}

MaterialTableUI.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(MaterialTableUI)