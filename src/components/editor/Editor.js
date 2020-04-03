import React, {Component} from 'react';
import {Editor as EditorDraft, EditorState, convertToRaw} from 'draft-js';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

class Editor extends Component {

    state = {
        editorState: EditorState.createEmpty()
    };

    onChange = (editorState) => {
        this.setState({editorState});
    };

    handleSave = () => {
        const content = convertToRaw(this.state.editorState.getCurrentContent());
        console.log(content);
    };

    render() {
        return (
            <div>
                <h1>Editor</h1>
                <EditorDraft editorState={this.state.editorState} onChange={this.onChange}/>
                <Button color={"secondary"} variant={"contained"} startIcon={<SaveIcon/>} onClick={this.handleSave}>Save</Button>
            </div>
        );
    }
}

export default Editor;