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
import ConfusionMatrix from "../components/ConfusionMatrix";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { api, apiServerUrl } from '../data/apiServer'


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
  const [row, setRow] = useState(0);
  const [noOfSteps, setNoOfSteps] = useState(100);
  const [sliderChanged, setSliderChanged] = useState(false);

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

    console.log('noOfSteps='  + noOfSteps)
    api.get('/projects/roc/' + projectId + '?no_of_steps=' + noOfSteps).then(function (response) {
      const { data } = response;
      console.log("ViewROC useEffect project=", data)
      setROCList(data["result"]);
      setAuc(data["auc"]);
      console.log("data", data)
      setSliderChanged(false);
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({ isOpen: true, message: msg, type: 'error' })
    });

    if (rocList.length > 0) {
      axios({
        method: 'get',
        url: apiServerUrl + '/projects/roc_plot_file/' + projectId,
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

  }, [rocList.length, sliderChanged]);

  const onClickRowHandler = (index) => {
    console.log('onClickRowHandler=' + index)
    setRow(index);
  }

  const onChangeNoOfStepsHandler = (event, newValue) => {
    console.log('onChangeNoOfStepsHandler=' + newValue)
    setNoOfSteps(newValue);
  }

  const onChangeCommittedNoOfStepsHandler = () => {
    console.log('onChangeNoOfStepsHandler=')
    setSliderChanged(true);
  }

  const marks = [
    { value: 10, label: '10' },
    { value: 100, label: '100' },
    { value: 1000, label: '1000' }
  ];

  function valuetext(value) {
    return `${value}`;
  }
  return (
    <>
      <Grid container spacing={1} >
        <ProjectHeader project={project} />
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Grid container spacing={1} >
              <Grid item xs={8}>
                <Typography variant="h4" gutterBottom> View ROC </Typography>
                <Typography variant="body1" gutterBottom>
                  No of discrete steps
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Always visible"
                      defaultValue={100}
                      getAriaValueText={valuetext}
                      step={10}
                      marks
                      min={10}
                      max={1000}
                      valueLabelDisplay="on"
                      value={noOfSteps}
                      onChange={onChangeNoOfStepsHandler}
                      onChangeCommitted={onChangeCommittedNoOfStepsHandler}
                    />
                  </Box>
                  <img src={rocImage} />
                  <Typography variant="h6" gutterBottom> Auc Score : {auc}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" gutterBottom> Usage </Typography>
                <Typography variant="body1" gutterBottom>
                  Area Under the Curve (AUC) > 90% is preferred for ???
                  Sensitiyity (TPR = True Positive Rate) = TP (TP + FN)<br />
                  Specificity (FPR = False Positive Rate) = FP / (FP+ TN) <br />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Grid container spacing={1} >
              <Grid item xs={8}>
                <Typography variant="h4" gutterBottom> View ROC List</Typography>
                <EnhancedTable2 headCells={headCells} correlationList={rocList} rowClickHander={onClickRowHandler} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" gutterBottom> Confusion Matrix</Typography>
                <ConfusionMatrix cmList={rocList} row={row}></ConfusionMatrix>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ViewROC;
