/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import blankProjectData from "../data/blankProjectData";


const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})


const Project = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params


  const [project, setProject] = useState(blankProjectData);
  const [accuracyList, setAccuracyList] = useState([]);

  useEffect(() => {

    let projectId = 1;
    let localFeaturesLabelsList = [];
    let localProject = blankProjectData;

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      setProject(data);
      setAccuracyList(data.accuracy);
    });

  }, [project.id]);


  const displayRow = (algorithm, accuracy) => {
    return (
      <TableRow key={algorithm}>
        <TableCell align="right">{algorithm}</TableCell>
        <TableCell align="right">{accuracy[0]}</TableCell>
        <TableCell align="right">{accuracy[1]}</TableCell>
      </TableRow>
    );
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
              <div>Model : {project.model} </div>
              <div>Algorithm: {project.algorithms.map((algorithm) => <div>{algorithm} </div>)}</div>
              <div> Features: {project.features.map((feature) => <div>{feature} </div>)}</div>
              <div> Label: {project.label.map((label) => <div>{label} </div>)}</div>
              <br />

              <TableContainer >
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Algorithm Name</TableCell>
                      <TableCell align="right">Accuracy Mean</TableCell>
                      <TableCell align="right">Accuracy Standard Deviation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {project ? (
                      Object.entries(accuracyList)
                        .map(([algorithm, accuracy]) => displayRow(algorithm, accuracy)
                        )
                    ) : (<CircularProgress />)
                    }
                  </TableBody>
                </Table>
              </TableContainer>


            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Project;
