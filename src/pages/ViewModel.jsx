/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from "../components/ProjectHeader";
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

let datax = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  }
];

const Project = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  const [accuracyList, setAccuracyList] = useState([]);
  const [data, setData] = useState([]);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })

  useEffect(() => {
    let localFeaturesLabelsList = [];
    let localProject = blankProjectData;

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      setProject(data);
      setAccuracyList(data.accuracy);
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({
        isOpen: true,
        message: msg,
        type: 'error'
      })
    });
    let d = [];
    Object.entries(accuracyList).map(([algorithm, accuracy]) => {
      let i = {};
      console.log("@@@@@@@@@@@", algorithm, '-', accuracy[0])
      i["Name"] = algorithm;
      i["Mean"] = accuracy[0];
      i["StandardDeviation"] = accuracy[1];
      d.push(i);
      console.log("@@@@@@@@@@@D", d)
    }
    )
    setData(d)

  }, [project.id,accuracyList]);


  const displayRow = (algorithm, accuracy) => {
    return (
      <TableRow key={algorithm}>
        <TableCell align="right">{algorithm}</TableCell>
        <TableCell align="right"><NumberFormat value={accuracy[0] * 100} decimalScale={4} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'%'} /></TableCell>
        <TableCell align="right"><NumberFormat value={accuracy[1]} decimalScale={4} displayType={'text'} thousandSeparator={true} /></TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Grid container spacing={1} >
        <ProjectHeader project={project} />

        <Grid item xs={12} >
          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <Grid container spacing={1} >
              <Grid item xs={12} >

                <Typography variant="h4" gutterBottom> Model </Typography>
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
              </Grid>
              <Grid item xs={12} >
              <Typography variant="h5" gutterBottom> Accuracy Mean </Typography>
                  <BarChart width={800} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Mean" fill="#8884d8" />
                  </BarChart>
              </Grid>
              <Grid item xs={12} >
              <Typography variant="h5" gutterBottom> Accuracy Standard Deviation </Typography>
                  <BarChart width={800} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="StandardDeviation" fill="#82ca9d" />
                  </BarChart>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />

    </>
  );
};

export default Project;
