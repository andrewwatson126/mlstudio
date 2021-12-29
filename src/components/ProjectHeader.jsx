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
    paddingTop: "5px",
    margin: "20px",
    height: "100%"
  },
}));


const ProjectHeader = props => {
  const { project } = props

  const classes = useStyles();


  return (
    <>

      <Grid item xs={12} >
        <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
          <Typography variant="h4" gutterBottom> Project Header </Typography>
          <Typography variant="body1" gutterBottom>
            <Grid container spacing={false} >
              <Grid item xs={6}>
                <div>Id: {project.id}</div>
              </Grid>
              <Grid item xs={6}>
                <div>Name: {project.name} </div>
              </Grid>
              <Grid item xs={6}>
                <div>Created By: {project.created_by} </div>
              </Grid>
              <Grid item xs={6}>
                <div>Created Date: {project.created_date}</div>
              </Grid>
              <Grid item xs={6}>
                <div>Description: {project.description} </div>
              </Grid>
              <Grid item xs={6}>
                <div>Data File: {project.data_file} </div>
              </Grid>
              <Grid item xs={6}>
                <div>Model : {project.model} </div>
              </Grid>
              <Grid item xs={12}>
                <div>Algorithm: {project.algorithms.map((algorithm) => <span>{algorithm} </span>)}</div>
              </Grid>
              <Grid item xs={12}>
                <div>Features: {project.features.map((feature) => <span>{feature} </span>)}</div>
              </Grid>
              <Grid item xs={12}>
                <div>Label: {project.label.map((label) => <span>{label} </span>)}</div>
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default ProjectHeader;


