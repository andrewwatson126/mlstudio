import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Typography, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: "15px",
    margin: "20px"
    },
  field: {
    fontWeight: 600
  }
}));


const ProjectHeader = props => {
  const { project } = props

  const classes = useStyles();


  return (
    <>

      <Grid item xs={12}>
        <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
          <Typography variant="h4" gutterBottom> Project - {project.id}: {project.name} </Typography>
          <Typography variant="body1" gutterBottom>
            <Grid container spacing={false} >
              <Grid item xs={6} md={3}>
                <div> <span className={classes.field}>Created By: </span>{project.created_by} </div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div><span className={classes.field}>Created Date: </span> {project.created_date}</div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div><span className={classes.field}>Data File: </span> {project.data_file} </div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div><span className={classes.field}>Model: </span> {project.model} </div>
              </Grid>
              <Grid item xs={12}>
                <div> <span className={classes.field}>Description: </span><span>{project.description} </span>)</div>
              </Grid>
              <Grid item xs={12}>
                <div> <span className={classes.field}>Algorithm: </span> {project.algorithms.map((algorithm) => <span>{algorithm} </span>)}</div>
              </Grid>
              <Grid item xs={12}>
                <div><span className={classes.field}>Features: </span> {project.features.map((feature) => <span>{feature} </span>)}</div>
              </Grid>
              <Grid item xs={12}>
                <div><span className={classes.field}>Label: </span> {project.label.map((label) => <span>{label} </span>)}</div>
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default ProjectHeader;


