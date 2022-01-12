/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from '../components/ProjectHeader';
import { makeStyles } from '@mui/styles';
import { api, apiServerUrl } from '../data/apiServer'


const useStyles = makeStyles((theme) => ({
  pageContent: {
    paddingTop: "20px",
    margin: "20px",
    height: "100%"
  },
}));

const ViewData = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);

  useEffect(() => {
    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      setProject(data);
    });

  }, [project.id]);


  return (
    <>
      <Grid container spacing={9} >
        <ProjectHeader project={project} />

        <Grid item xs={12}>
          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <Typography variant="h4" gutterBottom> Data </Typography>
            <Typography variant="body1" gutterBottom>
                https://www.kaggle.com/bhanvimenghani/heart-disease-pred-hc
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewData;
