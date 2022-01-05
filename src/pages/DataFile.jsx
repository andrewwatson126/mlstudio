import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Notification from "../components/Notification";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import CreateProject from "../components/CreateProject";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'
import { MediaBluetoothOnSharp } from "@mui/icons-material";
import ProjectHeader from "../components/ProjectHeader";
import blankProjectData from "../data/blankProjectData";
import Avatar from '@mui/material/Avatar';
import sherlock from "../images/sherlock.png";
import CloseIcon from '@material-ui/icons/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: "15px",
    margin: "20px"
  },
}));


const DataFile = (props) => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();
  const history = useHistory();

  const [project, setProject] = useState(blankProjectData);
  const [dataFile, setDataFile] = useState([]);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })
  const [uploaded, setUploaded] = useState([false]);

  useEffect(() => {
    if (projectId == 0) {
      setNotify({ isOpen: true, message: "Go to Project List and select a project to view", type: 'error' })
    }

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("useEffect data=", data);
      console.log("useEffect data_file=", data.data_file);
      setProject(data);
      setDataFile(data.data_file);
    }).catch(function (error) {
      let msg = 'Loading project failed=' + error;
      setNotify({
        isOpen: true,
        message: msg,
        type: 'error'
      })
    });  }, [uploaded]);


  const handleDataFileChange = (e) => {
    setDataFile(e.target.files[0])
    console.log("1-", e.target.files[0])
    console.log("2-", dataFile);
  }

  const uplodaDataFile = async () => {
    console.log('uplodaDataFile')
    console.log("3-", dataFile)
    console.log("4-", projectId)
    const fd = new FormData();
    //fd.append('project_id', projectId);
    fd.append('file', dataFile);

    axios({
      url: 'http://apiserver:8000/projects/uploadfile?project_id=' + projectId,
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      data: fd
    }).then(res => {
      console.log(res);
      setNotify({ isOpen: true, message: 'File upload successfully', type: 'success' })
      setUploaded(true)
    }).catch(function (error) {
      let msg = 'Project could not be deleted error=' + error;
      setNotify({ isOpen: true, message: msg, type: 'error' })
    })
  }

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />

      <Grid container spacing={1} >
        <ProjectHeader project={project} />
        <Grid item xs={12}>
          <Paper className={classes.pageContent}>
          <Typography variant="h4" gutterBottom> Upload Data File </Typography>
            <input type="file" onChange={handleDataFileChange} />
            <Button variant="contained" color="primary" onClick={uplodaDataFile} >
              Upload
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={false}></Grid>
      </Grid>

    </>
  );
};

export default DataFile;