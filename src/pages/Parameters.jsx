import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Typography, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'


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

  const featureNames = [
    { id: 0, label: "Age", name: "age" },
    { id: 1, label: "Gender", name: "gender" },
    { id: 2, label: "Test1", name: "test1" },
    { id: 3, label: "Test2", name: "test2" },
    { id: 4, label: "Test3", name: "test3" },
    { id: 5, label: "Diagnose", name: "diagnose" }
  ];

  const getInitialFeatureIds = () => {
    let initialFeatureIds = []
    featureNames.map((feature) => (
      mockProjectListData[projectId].features.map((projectFeature) => (
        //console.log('mockProjectListData[projectId]=' + mockProjectListData[projectId] + ' projectId=' + projectId + ' feature.name=' + feature.name + ' projectFeature=' + projectFeature)
        //feature.name === projectFeature ? console.log('mockProjectListData[projectId]=' + mockProjectListData[projectId] + ' projectId=' + projectId + ' feature.name=' + feature.name + ' projectFeature=' + projectFeature, ' feature.id=' + feature.id) : console.log('not')
        feature.name === projectFeature ? initialFeatureIds.push(feature.id) : console.log('not')
      ))))
    console.log('getInitialFeatureIds=' + initialFeatureIds);
    return initialFeatureIds;
  }

  const getInitialLabelIds = () => {
    let initialLabelIds = []
    featureNames.map((feature) => (
      mockProjectListData[projectId].label.map((projectLabel) => (
        //console.log('mockProjectListData[projectId]=' + mockProjectListData[projectId] + ' projectId=' + projectId + ' feature.name=' + feature.name + ' projectFeature=' + projectFeature)
        //feature.name === projectFeature ? console.log('mockProjectListData[projectId]=' + mockProjectListData[projectId] + ' projectId=' + projectId + ' feature.name=' + feature.name + ' projectFeature=' + projectFeature, ' feature.id=' + feature.id) : console.log('not')
        feature.name === projectLabel ? initialLabelIds.push(feature.id) : console.log('not')
      ))))
    console.log('getInitialFeatureIds=' + initialLabelIds);
    return initialLabelIds;
  }

  const [project, setProject] = useState(mockProjectListData[projectId]);
  const [model, setModel] = useState(mockProjectListData[projectId].model);
  const [algorithms, setAlgorithms] = useState(mockProjectListData[projectId].algorithms);
  const [featureIds, setFeatures] = useState(getInitialFeatureIds);
  const [labelIds, setLabels] = useState(getInitialLabelIds);


  const handleFeature = featureId => {
    console.log('featureId=' + featureId);
    const newIds = featureIds?.includes(featureId)
      ? featureIds.filter(id => id !== featureId)
      : [...(featureIds ?? []), featureId];
    setFeatures(newIds);
    console.log('newIds=' + newIds);
    //setFeatures({ ...features, [event.target.name]: event.target.checked });
  };


  const handleLabel = labelId => {
    console.log('labelId=' + labelId);
    const newIds = labelIds?.includes(labelId)
      ? labelIds.filter(id => id !== labelId)
      : [...(labelIds ?? []), labelId];
    setLabels(newIds);
    console.log('newIds=' + newIds);
    //setFeatures({ ...features, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (value) => {
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

              <form onSubmit={handleSubmit}>
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
                      <MenuItem key={'A'} value={'A'}>AlgorithmA</MenuItem>
                      <MenuItem key={'B'} value={'B'}>AlgorithmB</MenuItem>
                      <MenuItem key={'C'} value={'C'}>AlgorithmC</MenuItem>
                    </Select>
                    <FormHelperText>Select one or more algorithms you would like to use</FormHelperText>
                  </Grid>
                  <Grid item xs={12}>

                    { /* Features */}
                    <FormLabel>Features</FormLabel>
                    <FormGroup>
                      {featureNames.map((feature) =>
                        <FormControlLabel key={feature.name} control={<Checkbox name="{feature.name}" checked={featureIds.includes(feature.id)} onChange={() => { handleFeature(feature.id); }} />} label={feature.label} />
                      )}
                    </FormGroup>

                    { /* Labels */}
                    <FormLabel>Labels</FormLabel>
                    <FormGroup>
                      {featureNames.map((label) =>
                        <FormControlLabel key={label.name} control={<Checkbox name="{label.name}" checked={labelIds.includes(label.id)} onChange={() => { handleLabel(label.id); }} />} label={label.label} />
                      )}
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <Button variant="outlined" onClick={(e) => { console.log(model + '-' + algorithms) }}> Submit </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Parameters;
