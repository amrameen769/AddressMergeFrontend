import React, {Component} from 'react';
import {Editor as EditorDraft, EditorState, convertToRaw, RichUtils} from 'draft-js';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    onChange = (editorState) => {
        this.setState({editorState});
    };

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    handleSave = () => {
        const content = convertToRaw(this.state.editorState.getCurrentContent());
        console.log(content);
    };

    render() {
        return (
            <div>
                <h1>Editor</h1>
                <Button color="primary" onClick={this._onBoldClick.bind(this)}>B</Button>
                <EditorDraft
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                />
                <Button color={"secondary"} variant={"contained"} startIcon={<SaveIcon/>}
                        onClick={this.handleSave}>Save</Button>
            </div>
        );
    }
}

export default Editor;