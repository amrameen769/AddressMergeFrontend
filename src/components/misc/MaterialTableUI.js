import React from 'react';
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {handleBackClick} from "./utility";
import {sendMessage} from "../messages/messagesSlice";

function MaterialTableUI(props) {
    const {columns, data, title, user, editMethod, deleteMethod} = props;
    return (
        <Container maxWidth={"xl"}>
            <MaterialTable
                title={title}
                columns={columns}
                data={data}
                options={{
                    sorting: true,
                    filtering: true
                }}
                actions={[
                    rowData => ({
                        icon: "edit",
                        tooltip: "Edit",
                        onClick: (event, rowData) => {
                            if (user.id !== rowData.owner) {
                                sendMessage("You can't edit this data", "warning");
                            } else {
                                editMethod(rowData);
                                handleBackClick(event);
                            }
                        },
                        disabled: rowData.owner !== user.id
                    }),
                    rowData => ({
                        icon: "delete",
                        tooltip: "Delete",
                        onClick: (event, rowData) => {
                            if (user.id !== rowData.owner) {
                                sendMessage("You can't delete this data", "warning");
                            } else {
                                deleteMethod(rowData.id);
                            }
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