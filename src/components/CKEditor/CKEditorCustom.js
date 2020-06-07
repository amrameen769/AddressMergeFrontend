import React, {Component} from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import CKEditor from "@ckeditor/ckeditor5-react";
import {connect} from "react-redux";
import {createContent, fetchDocuments, updateThisDocument, fetchDocumentTypes, flushEdit} from "./editorSlice";
import ListDocuments from "./ListDocuments";
import SaveDialog from "./SaveDialog";
import Button from "@material-ui/core/Button";
import store from "../../app/store";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import FormControl from "@material-ui/core/FormControl";
import {withStyles} from "@material-ui/styles";
import PropTypes from 'prop-types';
// import parse from 'html-react-parser';


class CkEditorCustom extends Component {
    state = {
        id: "",
        docName: "",
        docContent: "",
        docType: ``,
        isTemplate: false,
        owner: ""
    }
    handleCheckBox = event => {
        this.setState({[event.target.name]: event.target.checked})
    }

    componentDidMount() {
        this.props.fetchDocuments();
        this.props.fetchDocumentTypes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editContentData && prevProps.editContentData !== this.props.editContentData) {
            const {id, docName, docType, docContent, isTemplate, owner} = this.props.editContentData;
            this.setState({
                id, docName, docType, docContent, isTemplate, owner
            })
        }
    }

    handleContentChange = editor => {
        this.setState({
            docContent: editor.getData()
        })
    }

    handleSave = () => {
        const {docContent, docName, docType, isTemplate} = this.state;
        const document = {docContent, docName, docType, isTemplate};
        // console.log(document);
        this.props.createContent(document);
        this.setState({
            id: "",
            docName: "",
            docContent: "",
            docType: ``,
            isTemplate: false,
            owner: ""
        })
    }

    handleUpdate = () => {
        const {id, docContent, docName, docType, isTemplate} = this.state;
        const document = {id, docContent, docName, docType, isTemplate};
        this.props.updateThisDocument(document);
        this.setState({
            id: "",
            docName: "",
            docContent: "",
            docType: ``,
            isTemplate: false,
            owner: ""
        })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleReset = () => {
        this.setState({
            id: "",
            docName: "",
            docContent: "",
            docType: ``,
            isTemplate: false,
            owner: ""
        })
        store.dispatch(flushEdit());
    }

    render() {
        const {editContentData, classes} = this.props;
        const {docName, docContent} = this.state;
        return (
            <div>
                <div className="editor">
                    {editContentData ? (
                        <h2>Edit Document "{docName}"</h2>
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
                        onChange={(event, editor) => this.handleContentChange(editor)}
                    />
                </div>
                {editContentData ? (
                    <div>
                        <FormControl className={classes.saveButton}>
                            <SaveDialog
                                name={"Update"}
                                message={"Update this Document"}
                                changeAction={this.handleChange}
                                changeCheckbox={this.handleCheckBox}
                                saveAction={this.handleUpdate}
                                docType={this.state.docType}
                                docName={this.state.docName}
                                isTemplate={this.state.isTemplate}
                                actionDialog={"Confirm"}
                            />
                        </FormControl>

                        <FormControl className={classes.saveButton}>
                            <Button startIcon={<ClearAllIcon/>} onClick={this.handleReset} color={"secondary"}
                                    variant={"contained"}>
                                Clear
                            </Button>
                        </FormControl>
                    </div>
                ) : (
                    <FormControl className={classes.saveButton}>
                        <SaveDialog
                            name={"Save"}
                            message={"Save this Document"}
                            changeAction={this.handleChange}
                            changeCheckbox={this.handleCheckBox}
                            saveAction={this.handleSave}
                            docType={this.state.docType}
                            docName={this.state.docName}
                            isTemplate={this.state.isTemplate}
                            actionDialog={"Confirm"}/>
                    </FormControl>
                )}
                <ListDocuments/>
            </div>
        );
    }
}

const styles = theme => ({
    saveButton: {
        margin: theme.spacing(2)
    },
})

const mapStateToProps = state => ({
    editContentData: state.editor.editContentData
})

CkEditorCustom.propTypes = {
    createContent: PropTypes.func.isRequired,
    fetchDocuments: PropTypes.func.isRequired,
    updateThisDocument: PropTypes.func.isRequired,
    fetchDocumentTypes: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
    createContent,
    fetchDocuments,
    updateThisDocument,
    fetchDocumentTypes
})(withStyles(styles)(CkEditorCustom));