import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Paper } from "@material-ui/core";
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

const Parameters = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();
  const history = useHistory();

  const [project, setProject] = useState(mockProjectListData[projectId]);
  { console.log(project) }

  //const handleCreateProject = (open) => {
  //  console.log(open);
  //  setOpenCreateProject(open);
  //}

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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Parameters;
