import React, {Component} from 'react';
import {connect} from "react-redux";
import {editThisContent, removeDocument} from "./editorSlice";
import {Checkbox} from "@material-ui/core";
import {returnArrayData} from "../misc/utility";
import MaterialTableUI from "../misc/MaterialTableUI";
import PropTypes from "prop-types";

const columns = [
    {
        field: 'id', title: "#"
    },
    {
        field: 'docName',
        title: "Document Name",
    },
    {
        field: 'documentType',
        title: "Document Type",
    },
    {
        field: 'isTemplate',
        title: "Template",
        render: (rowData) => {
            return <Checkbox readOnly checked={rowData.isTemplate}/>
        }
    },
    {
        field: 'authorName',
        title: "Author",
    },
]

class ListDocuments extends Component {
    render() {
        const {documents} = this.props;
        const rows = returnArrayData(documents);

        return (
            <div>
                <h2>Documents</h2>
                <MaterialTableUI columns={columns} data={rows} title={"Documents"}
                                 editMethod={this.props.editThisContent} deleteMethod={this.props.removeDocument}/>
            </div>
        );
    }
}

ListDocuments.propTypes = {
    documents: PropTypes.array.isRequired,
    editThisContent: PropTypes.func.isRequired,
    removeDocument: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    documents: state.editor.documents,
})

export default connect(mapStateToProps, {editThisContent, removeDocument})(ListDocuments);
