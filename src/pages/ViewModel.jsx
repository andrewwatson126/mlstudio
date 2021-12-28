/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from "../components/ProjectHeader";
/* 
import { makeStyles } from "@material-ui/core/styles";
*/
import { makeStyles } from '@mui/styles';


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

const Project = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  const [accuracyList, setAccuracyList] = useState([]);

  useEffect(() => {
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
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      <Grid container spacing={9} >
        <ProjectHeader project={project} />

        <Grid item xs={12} >
          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <Typography variant="h4" gutterBottom> Predict </Typography>
            <Typography variant="body1" gutterBottom>
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
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Project;
