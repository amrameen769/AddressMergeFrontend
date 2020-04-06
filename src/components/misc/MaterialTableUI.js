import React from 'react';
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";

export default function MaterialTableUI(props) {
    const {columns, data, title} = props;
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
                    {
                        icon: "edit",
                        tooltip: "Edit Donation",
                        onClick: (event, rowData) => {
                            console.log("Edit " + rowData.id)
                        }
                    },
                    {
                        icon: "delete",
                        tooltip: "Delete Donation Record",
                        onClick: (event, rowData) => {
                            console.log("Delete " + rowData.id)
                        }
                    }
                ]}
            />
        </Container>
    );
};
