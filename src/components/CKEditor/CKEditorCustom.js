import React, {Component} from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import CKEditor from "@ckeditor/ckeditor5-react";
import {connect} from "react-redux";
import {createContent, fetchDocuments, editThisContent} from "./editorSlice";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import {v4 as uuidv4} from 'uuid';
import parse from 'html-react-parser';


class CkEditorCustom extends Component {
    state = {
        docName: "",
        docContent: "",
    }

    componentDidMount() {
        this.props.fetchDocuments();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.editContentData !== this.props.editContentData) {
            const {docName, docContent} = this.props.editContentData;
            this.setState({
                docName, docContent
            })
        }
    }

    handleChange = editor => {
        this.setState({
            docContent: editor.getData()
        })
    }

    handleSave = () => {
        const {docContent} = this.state;
        const document = {docContent, docName: "Doc " + uuidv4()};
        this.props.createContent(document);
    }

    handleEdit = (id) => {
        const document = this.props.documents.filter(doc => (doc.id === id))
        // console.log(document[0]);
        this.props.editThisContent(document[0])
    }

    render() {
        const {editContentData} = this.props;
        const {docName, docContent} = this.state;
        return (
            <div>
                <div className="editor">
                    {editContentData ? (
                        <h2>Edit Document {docName}</h2>
                    ) : (
                        <h2>Create Document</h2>
                    )}
                    <div id="toolbar-container"/>
                    <CKEditor
                        editor={DecoupledEditor}
                        data={docContent}
                        onInit={editor => {
                            const toolbarContainer = document.querySelector('#toolbar-container');
                            toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                            window.editor = editor;
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }
                        }
                        onChange={(event, editor) => this.handleChange(editor)}
                    />
                </div>
                <Button color={"primary"} variant={"contained"} startIcon={<SaveIcon/>}
                        onClick={this.handleSave}>
                    Save
                </Button>
                <div>
                    <h2>Documents</h2>
                    {this.props.documents && this.props.documents.map(doc => (
                            <div key={doc.id}>
                                <h2>{doc.docName}</h2>
                                <Button color={"secondary"} onClick={() => this.handleEdit(doc.id)}>Edit</Button>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    documents: state.editor.documents,
    editContentData: state.editor.editContentData
})

export default connect(mapStateToProps, {createContent, fetchDocuments, editThisContent})(CkEditorCustom);