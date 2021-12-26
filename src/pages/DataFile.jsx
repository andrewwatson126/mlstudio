import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CreateProject from "../component/CreateProject";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'
import { MediaBluetoothOnSharp } from "@mui/icons-material";



const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const useStyles = makeStyles((theme) => ({
  pageContent: {
    backgroundColor: "#ff0",
    color: "#f0f",
    paddingTop: "20px",
    margin: "20px",
    height: "200px"
  },
}));


const DataFile = (props) => {
  const { match } = props
  const { params } = match
  const { projectId } = params


  const classes = useStyles();
  const history = useHistory();

  const [dataFile, setDataFile] = useState([]);

  useEffect(() => {
    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("useEffect data=", data);
      console.log("useEffect data_file=", data.data_file);
      setDataFile(data.data_file);
    })
  }, []);


  const handleDataFileChange = (e) => {
    setDataFile(e.target.files[0])
    console.log("1-", e.target.files[0])
    console.log("2-", dataFile);
  }

  const uplodaDataFile = async () => {
    console.log('uplodaDataFile')
    console.log("3-", dataFile)
    console.log("4-", projectId)
    try {
      const fd = new FormData();
      fd.append('project_id', projectId);
      fd.append('file', dataFile);

      axios({
        url: 'http://apiserver:8000/projects/uploadfile/',
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data: fd
      }).then(res => {
        console.log(res);
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      <Grid container spacing={9} >
        <Grid item xs={false}></Grid>
        <Grid item xs={12}>
          {console.log("4-", dataFile)}
          <Paper className={classes.pageContent}>
            <input type="file" onChange={handleDataFileChange} />

            <Button variant="outlined" onClick={uplodaDataFile} >
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
