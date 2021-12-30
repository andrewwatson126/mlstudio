import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, Typography, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Container, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import mockProjectListData from "../data/mockProjectListData";
import blankProjectData from "../data/blankProjectData";
import algorithmListData from "../data/algorithmListData";
import { useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from "axios";
import { height } from "@mui/system";
import ProjectHeader from '../components/ProjectHeader';
import Notification from "../components/Notification";

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const useStyles = makeStyles((theme) => ({
  pageContent: {
    paddingTop: "20px",
    margin: "20px",
    height: "100%"
  },
}));


const Parameters = props => {
  console.log('Parameters props=', props)
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();
  const history = useHistory();

  const [project, setProject] = useState(blankProjectData);
  const [model, setModel] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [featuresLabelsList, setFeaturesLabelsList] = useState([]);
  const [featureLabels, setFeatures] = useState([]);
  const [labelLabels, setLabels] = useState([]);
  const [algorithmListData, setAlgorithmListData] = useState([]);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })


  useEffect(() => {
    let localFeaturesLabelsList = [];
    let localProject = blankProjectData;

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      localProject = data
      setProject(data);
      setModel(data["model"]);
      setAlgorithms(data["algorithms"]);
      getFeaturesLabels();
      getAlgorithms();
      getFeatureLabels();
      getLabelLabels();
    });


    const getFeaturesLabels = () => {
      api.get('/projects/features_labels/' + projectId).then(function (response) {
        const { data } = response;
        console.log(" ", data);
        localFeaturesLabelsList = data
        console.log("!!! useEffect  features_lables-response=", response);
        console.log("!!! useEffect getFeaturesLabels localFeaturesLabelsList=", localFeaturesLabelsList);
        setFeaturesLabelsList(data);
      });
    }

    const getAlgorithms = () => {
      api.get('/algorithms').then(function (response) {
        const { data } = response;
        console.log("!!! useEffect  algorithms=", data);
        setAlgorithmListData(data);
      })
    }

    const getLabelLabels = () => {
      let ll = []
      project.label.map((label) => (
        ll.push(label)
      ))
      console.log('!!! useEffect ll=' + ll);
      setLabels(ll);
    }


    const getFeatureLabels = () => {
      let fl = [];
      project.features.map((label) => (
        fl.push(label)
      ))
      console.log('!!! useEffect fl=' + fl);
      setFeatures(fl);
    }

  }, [project.id]);


  const handleFeature = featureLabel => {
    console.log('featureLabel=' + featureLabel);
    const newLabels = featureLabels?.includes(featureLabel)
      ? featureLabels.filter(label => label !== featureLabel)
      : [...(featureLabels ?? []), featureLabel];
    setFeatures(newLabels);
    console.log('newLabels=' + newLabels);
  };


  const handleLabel = labelLabel => {
    console.log('labelLabel=' + labelLabel);
    const newLabels = labelLabels?.includes(labelLabel)
      ? labelLabels.filter(label => label !== labelLabel)
      : [...(labelLabels ?? []), labelLabel];
    setLabels(newLabels);
    console.log('newLabels=' + newLabels);
  };


  const getProject = async () => {
    // get project
    try {
      api.get('/projects/' + projectId).then(function (response) {
        const { data } = response;
        return data;
      })

    } catch (err) {
      console.log(err)
      setNotify({
        isOpen: true,
        message: 'Failed to load project',
        type: 'error'
    })
    }
  }


  const sendChanges = async () => {

    try {
      let res = await api.put('/projects', { id: projectId, model: model, algorithms: algorithms, features: featureLabels, label: labelLabels })
      setNotify({
        isOpen: true,
        message: 'Project parameters updated',
        type: 'success'
    })
    } catch (err) {
      console.log(err)
      setNotify({
        isOpen: true,
        message: 'Project parameters update failed',
        type: 'error'
    })
      }
  }


  return (
    <>
    { /* 
      <AppBar position="static">
        <Toolbar />
      </AppBar>
    */}

      <Grid container spacing={1} >
        <Grid item xs={12}>
          <ProjectHeader project={project} />
          <Grid item xs={12} >
            <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
              <Typography variant="h4" gutterBottom> Set Project Parameters </Typography>
              <Typography variant="body1" gutterBottom>
              <Grid container spacing={3} >
                  <Grid item xs={12}>
                    { /* Model */}
                    <FormControl>
                      <FormLabel>Model</FormLabel>
                      <RadioGroup row label="model" name="model" value={model} onChange={(e) => { setModel(e.target.value); }}>
                        <FormControlLabel key="supervised" value="supervised" control={<Radio />} label="supervised" />
                        <FormControlLabel key="unsupervised" value="unsupervised" control={<Radio />} label="unsupervised" />
                      </RadioGroup>
                    </FormControl>
                    <FormHelperText>Select model to either predict or categorize</FormHelperText>
                  </Grid >
                  <Divider />

                  { /* Algorithms */}
                  <Grid item xs={12}>
                    <FormLabel>Algorithm</FormLabel>
                    <Select name="algorithm" value={algorithms} onChange={(e) => { setAlgorithms(e.target.value); }} labelId="algorithm" id="alogrithm" label="Algorithm" multiple >
                      <MenuItem key={'X'} value={'X'}>All</MenuItem>
                      {algorithmListData.map((algorithm) =>
                        <MenuItem key={algorithm.label} value={algorithm.label}>{algorithm.label}</MenuItem>
                      )}
                    </Select>
                    <FormHelperText>Select one or more algorithms you would like to use</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>

                    { /* Features */}
                    <FormLabel>Features</FormLabel>
                    <FormGroup>
                      {featuresLabelsList.map((feature) =>
                        <FormControlLabel key={feature.label} control={<Checkbox name="{feature.name}" checked={featureLabels.includes(feature.label)} onChange={() => { handleFeature(feature.label); }} />} label={feature.label} />
                      )}
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>

                    { /* Labels */}
                    <FormLabel>Labels</FormLabel>
                    <FormGroup>
                      {featuresLabelsList.map((label) =>
                        <FormControlLabel key={label.label} control={<Checkbox name="{label.name}" checked={labelLabels.includes(label.label)} onChange={() => { handleLabel(label.label); }} />} label={label.label} />
                      )}
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <Button type="submit" variant="contained" color="primary" onClick={sendChanges}> Submit </Button>
                      <Alert severity="error" >
                        model= {model} -
                        algorithms= {algorithms} -
                        features= {featureLabels} -
                        label= {labelLabels}

                      </Alert>


                    </div>
                  </Grid>
                </Grid >
              </Typography>
            </Paper >
          </Grid >
        </Grid >
      </Grid >

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Parameters;
