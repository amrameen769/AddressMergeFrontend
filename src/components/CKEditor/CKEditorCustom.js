import React, {Component} from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react";
import {connect} from "react-redux";
import {createContent} from "./editorSlice";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";


class CkEditorCustom extends Component {
    state = {
        docContent: ""
    }

    handleChange = editor => {
        this.setState({
            docContent: editor.getData()
        })
    }

    handleSave = () => {
        const { docContent } = this.state;
        const document = {docContent};
        this.props.createContent(document);
    }

    render() {
        const {docContent} = this.state;
        return (
            <div>
                <div className="editor">
                    <CKEditor
                        editor={ClassicEditor}
                        data={docContent}
                        onChange={(event, editor) => this.handleChange(editor)}
                    />
                </div>
                <div>
                    <h2>Content</h2>
                    <p>{this.props.content}</p>
                </div>
                <Button color={"secondary"} variant={"contained"} startIcon={<SaveIcon/>}
                        onClick={this.handleSave}>Save</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    content: state.editor.content.docContent
})

export default connect(mapStateToProps, {createContent})(CkEditorCustom);