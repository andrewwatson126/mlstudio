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
    paddingTop: "20px",
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
            <div>Project Header for project is {project.id}</div>
            <div>Name: {project.name} </div>
            <div>Created By: {project.created_by} </div>
            <div>Created Date: {project.created_date}</div>
            <div>Description: {project.description} </div>
            <div>Data File: {project.data_file} </div>
            <div>Model : {project.model} </div>
            <div>Algorithm: {project.algorithms.map((algorithm) => <span>{algorithm} </span>)}</div>
            <div>Features: {project.features.map((feature) => <span>{feature} </span>)}</div>
            <div>Label: {project.label.map((label) => <span>{label} </span>)}</div>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default ProjectHeader;


