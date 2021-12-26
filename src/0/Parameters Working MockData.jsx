import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Typography, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import mockProjectListData from "../data/mockProjectListData";
import algorithmListData from "../data/algorithmListData";
import { useHistory, useLocation } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from "axios";

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const useStyles = makeStyles((theme) => ({
  projectListContainer: {
    backgroundColor: theme.palette.common.white,
    paddingTop: "20px",
    margin: "20px",
  }
}));

const initialValues = {
  model: 'supervised',
  features: [],
  label: [],
  algorithms: []
}



const Parameters = props => {


  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();
  const history = useHistory();

  const getFeaturesLabelList = () => {
    try {
      api.get('/projects/features_labels/' + projectId).then(function (response) {
        const { data } = response;
        console.log("response=", response)
        console.log("data=", data)
        return data;
      })

    } catch (err) {
      console.log(err)
    }
  }

  // const featureNames = getFeaturesLabelList();
  const featureNames =
    [
      { label: "Age", name: "age" },
      { label: "Gender", name: "gender" },
      { label: "Test1", name: "test1" },
      { label: "Test2", name: "test2" },
      { label: "Test3", name: "test3" },
      { label: "Diagnose", name: "diagnose" }
    ];

  const getInitialFeatureLabels = () => {
    let initialFeatureLabels = []
    console.log("************featureNames=", featureNames)
    featureNames.map((feature) => (
      mockProjectListData[projectId].features.map((projectFeature) => (
        feature.name === projectFeature ? initialFeatureLabels.push(feature.label) : console.log('not')
      ))))
    console.log('getInitialFeatureLabels=' + initialFeatureLabels);
    return initialFeatureLabels;
  }

  const getInitialLabelLabels = () => {
    let initialLabelLabels = []
    featureNames.map((feature) => (
      mockProjectListData[projectId].label.map((projectLabel) => (
        feature.name === projectLabel ? initialLabelLabels.push(feature.label) : console.log('not')
      ))))
    console.log('getInitialFeatureLabels=' + initialLabelLabels);
    return initialLabelLabels;
  }





  const [project, setProject] = useState(mockProjectListData[projectId]);
  const [model, setModel] = useState(mockProjectListData[projectId].model);
  const [algorithms, setAlgorithms] = useState(mockProjectListData[projectId].algorithms);
  const [featuresLabelsList, setFeaturesLabelsList] = useState(getFeaturesLabelList);
  const [featureLabels, setFeatures] = useState(getInitialFeatureLabels);
  const [labelLabels, setLabels] = useState(getInitialLabelLabels);


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
        const { project } = response;
        return project;
      })

    } catch (err) {
      console.log(err)
    }
  }



  const sendChanges = async () => {
    project = getProject();

    try {
      const fd = new FormData();
      fd.append('id', projectId);
      fd.append('name', project["name"]);
      fd.append('created_date', project["created_date"]);
      fd.append('description', project["description"]);
      fd.append('data_file', project["data_file"]);
      fd.append('created_by', project["created_by"]);
      fd.append('model', model);
      fd.append('algorithms', algorithms);
      fd.append('features', featureLabels);
      fd.append('label', labelLabels);
      fd.append('accuracy', project["accuracy"]);

      axios({
        url: 'http://apiserver:8000/projects/project_id=' + projectId,
        //url: 'http://apiserver:8000/projects/',
        method: "PUT",
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }} >
              <div>Project Header for project is '${projectId}' </div>
              <div>Name: {project.name} </div>
              <div>Created By: {project.createdBy} </div>
              <div>Created Date: {project.createdDate}</div>
              <div>Description: {project.description} </div>
              <div>Data File: {project.dataFile} </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }} >
              <div>Model : {project.model} </div>
              <div>Algorithm: {project.algorithms.map((algorithm) => <div>{algorithm} </div>)}</div>
              <div> Features: {project.features.map((feature) => <div>{feature} </div>)}</div>
              <div> Label: {project.label.map((label) => <div>{label} </div>)}</div>
              <br />

              <Grid container>
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
                </Grid>
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
                <Grid item xs={12}>

                  { /* Features */}
                  <FormLabel>Features</FormLabel>
                  <FormGroup>
                    {featureNames.map((feature) =>
                      <FormControlLabel key={feature.label} control={<Checkbox name="{feature.name}" checked={featureLabels.includes(feature.label)} onChange={() => { handleFeature(feature.label); }} />} label={feature.label} />
                    )}
                  </FormGroup>

                  { /* Labels */}
                  <FormLabel>Labels</FormLabel>
                  <FormGroup>
                    {featureNames.map((label) =>
                      <FormControlLabel key={label.label} control={<Checkbox name="{label.name}" checked={labelLabels.includes(label.label)} onChange={() => { handleLabel(label.label); }} />} label={label.label} />
                    )}
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <Button type="submit" variant="outlined" onClick="sendChanges"> Submit </Button>
                    <Alert severity="error" >
                      model= {model} -
                      algorithms= {algorithms} -
                      features= {featureLabels} -
                      label= {labelLabels}

                    </Alert>


                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Parameters;
