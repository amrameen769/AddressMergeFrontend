import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddCategory from "../misc/AddCategory";
import {createDocumentType} from "./editorSlice";
import SaveIcon from "@material-ui/icons/Save";
import PropTypes from 'prop-types';

function SaveDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSave() {
        props.saveAction();
        setOpen(false);
    }

    return (
        <div>
            <Button startIcon={<SaveIcon/>} variant="contained" color="primary" onClick={handleClickOpen}>
                {props.name}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.message}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={props.docName}
                        id="docName"
                        name={"docName"}
                        label="Name"
                        type="email"
                        onChange={props.changeAction}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.isTemplate}
                                onChange={props.changeCheckbox}
                                name="isTemplate"
                                color="primary"
                            />
                        }
                        label="Is Template"
                    />
                    <Grid container spacing={2} alignItems="center" direction={"row"} justify={"center"}>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="documentTypeLabel">Document Type</InputLabel>
                                <Select
                                    labelId="documentTypeLabel"
                                    name={"docType"}
                                    value={props.docType}
                                    onChange={props.changeAction}
                                    label="Sponsor Group"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {props.documentTypes.map(docType => (
                                        <MenuItem key={docType.id} value={docType.id}>{docType.typeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <AddCategory name={"document-type"} action={"Add Document Type"}
                                         method={props.createDocumentType}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {props.actionDialog}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
    documentTypes: state.editor.documentTypes
})

SaveDialog.propTypes = {
    createDocumentType: PropTypes.func.isRequired,
    documentTypes: PropTypes.array.isRequired
}

export default connect(mapStateToProps, {createDocumentType})(SaveDialog);