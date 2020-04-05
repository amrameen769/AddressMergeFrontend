import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    addButton: {
        height: theme.spacing(7)
    }
}));

export default function AddCategory(props) {
    const [open, setOpen] = React.useState(false);
    const {name, action, method} = props;
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (name === "candidate-category") {
            const category = {
                categoryName: document.getElementById(`${name}`).value
            };
            method(category);
        } else if (name === "sponsor-group") {
            const category = {
                groupName: document.getElementById(`${name}`).value
            };
            method(category);
        }
        setOpen(false);
    };

    return (
        <div>
            <Button className={classes.addButton} variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{action}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={name}
                        label={action}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
