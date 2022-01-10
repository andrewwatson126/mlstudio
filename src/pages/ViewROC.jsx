/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import Buffer from "Buffer";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from '../components/ProjectHeader';
import EnhancedTable2 from '../components/EnhancedTable2';
import { makeStyles } from '@mui/styles';
import Notification from "../components/Notification";


const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: "15px",
    margin: "20px"
  },
}));

const headCells = [
  { id: 'thresholds', numeric: true, disablePadding: false, label: 'Thresholds' },
  { id: 'sensitivity', numeric: true, disablePadding: false, label: 'Sensitivity' },
  { id: ' ', numeric: true, disablePadding: false, label: 'Specificity' },
];


const ViewROC = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  const [rocList, setROCList] = useState([]);
  const [rocImage, setROCImage] = useState([]);
  const [auc, setAuc] = useState(0);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })

  useEffect(() => {
    console.log("ViewROC useEffect stated")
    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      setProject(data);
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({ isOpen: true, message: msg, type: 'error' })
    });

    api.get('/projects/roc/' + projectId).then(function (response) {
      const { data } = response;
      console.log("ViewROC useEffect project=", data)
      setROCList(data["result"]);
      setAuc(data["auc"]);
      console.log("data", data)
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({ isOpen: true, message: msg, type: 'error' })
    });

    if (rocList.length > 0) {
      axios({
        method: 'get',
        url: 'http://apiserver:8000/projects/roc_plot_file/' + projectId,
        responseType: 'blob'
      })
        .then(function (res) {
          const reader = new FileReader();
          let base64 = "";
          reader.addEventListener('loadend', (e) => {
            base64 = e.srcElement.result;
            console.log(base64);
            setROCImage("data:image/png;base64," + base64);
          });
          reader.readAsText(res.data);
          console.log("res=", res);
          console.log("base64=", base64);
        }).catch(function (error) {
          let msg = 'Plot project failed=' + error;
          setNotify({ isOpen: true, message: msg, type: 'error' })
        });
    }

  }, [rocList.length]);


  return (
    <>
      <Grid container spacing={1} >
        <ProjectHeader project={project} />
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Typography variant="h4" gutterBottom> View ROC </Typography>
            <Typography variant="h6" gutterBottom> Auc Score : {auc}</Typography>
            <Typography variant="body1" gutterBottom>
              <img src={rocImage} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Typography variant="h4" gutterBottom> View ROC List</Typography>
            <EnhancedTable2 headCells={headCells} correlationList={rocList} />
          </Paper>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ViewROC;
