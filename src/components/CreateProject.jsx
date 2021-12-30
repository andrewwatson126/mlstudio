import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, DialogTitle, DialogContent, Dialog, Typography, TextField } from '@material-ui/core/';
import { Toolbar, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Container, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Notification from "../components/Notification";


const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  },
  form: {
    width: '90%',
    // margin: theme.spacing(1)
  }
}))

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const CreateProject = props => {
  const classes = useStyles();

  const { openCreateProject, setOpenCreateProject } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState([]);
  const [shared, setShared] = useState([]);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })


  const createProject = async () => {
    console.log('createProject')
    try {
      let res = await api.post('/projects',
        {
          "id": 0,
          "name": name,
          "created_date": "2021-12-28T19:45:42.591Z",
          "description": description,
          "data_file": "",
          "created_by": "ng3",
          "model": "supervised",
          "algorithms": [],
          "features": [],
          "label": [],
          "accuracy": {}
        })

      console.log(res)
      setOpenCreateProject(false);
    } catch (err) {
      setNotify({
        isOpen: true,
        message: 'Project creation failed',
        type: 'error'
      });
      console.log(err);
    }
  }

  return (
    <Dialog open={openCreateProject} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>Create Project </Typography>
          <Button variant="contained" color="primary" onClick={() => { setOpenCreateProject(false) }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>

        <Grid container spacing={1} >
          <Grid item xs={12} >
            <TextField id="name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} className={classes.form} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="description" label="Description" variant="outlined" multiline rows={5} onChange={(e) => setDescription(e.target.value)} className={classes.form} />
          </Grid>
          <Grid item xs={12}>
            { /* Model */}
            <FormControl>
              <FormLabel>Model</FormLabel>
              <RadioGroup row label="model" name="model" value={model} onChange={(e) => { setModel(e.target.value); }}>
                <FormControlLabel key="supervised" checked disabled value="supervised" control={<Radio />} label="supervised" />
                <FormControlLabel key="unsupervised" disabled value="unsupervised" control={<Radio />} label="unsupervised" />
              </RadioGroup>
            </FormControl>
            <FormHelperText>Select model to either predict or categorize</FormHelperText>
          </Grid >
          <Grid item xs={12}>
            { /* Model */}
            <FormControl>
              <FormLabel>Shared</FormLabel>
              <RadioGroup row label="shared" name="Shared" value={shared} onChange={(e) => { setShared(e.target.value); }}>
                <FormControlLabel key="public" disabled value="public" control={<Radio />} label="public" />
                <FormControlLabel key="private" checked disabled value="private" control={<Radio />} label="private" />
              </RadioGroup>
            </FormControl>
            <FormHelperText>Select model to either predict or categorize</FormHelperText>
          </Grid >
          <Grid item xs={12}>
            <Button onClick={createProject} variant="contained" >Create</Button>
          </Grid>
        </Grid>

      </DialogContent>

      <Notification notify={notify} setNotify={setNotify} />

    </Dialog>
  );
};

export default CreateProject;
