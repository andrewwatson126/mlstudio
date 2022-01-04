import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

const Notification = props => {
    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        console.log('Notification=' + notify.type + '-' + notify.message)

        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        }

        )
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert 
                severity={notify.type}
                variant="filled"
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
