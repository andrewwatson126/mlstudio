import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { DialogTitle, DialogContent, Dialog, Typography, TextField } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@mui/material/Button';
import axios from "axios";

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
  }
}))

const initialValues = {
  name: 'test',
  createBy: 'nevilgultekin',
  createDate: new Date(),
  description: 'desc',
  dataFile: ''
}

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const CreateProject = props => {
  const { title, children, openCreateProject, setOpenCreateProject } = props;
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);


  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    console.log(values);
  }

  { console.log(props); }

  const createProject = async () => {
    console.log('createProject')
    try {
      let res = await api.post('/projects', { name: values.name, description: values.description, created_by: "nevil" })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Dialog open={openCreateProject} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>Create Project </Typography>
          <Button color="secondary" onClick={() => { setOpenCreateProject(false) }}>
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>

        <form onSubmit={createProject}>
          <Grid container>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Name" name="name" value={values.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" label="Description" name="description" value={values.description} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" text="Submit" variant="outlined" />
            </Grid>
          </Grid>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
