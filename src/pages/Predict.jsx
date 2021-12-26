/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Typography, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})

const Predict = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params


  const [project, setProject] = useState(mockProjectListData[projectId]);
  const [features, setFeatures] = useState([]);
  const [values, setValues] = useState({});
  const [prediction, setPrediction] = useState({});


  useEffect(() => {
    let projectId = 1;

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      setProject(data);
      setFeatures(data.features);
      features.map(feature => values[feature] = "")
    });

  }, [project.id]);

  const inputChangedHandler = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(values);
  }

  const predictHandler = async () => {
    try {
      let d1 = []
      let d2 = []
      d1.push(d2)
      d2.push(1)
      d2.push(2)
      d2.push(3)
      d2.push(4)
      let res = await api.post('/projects/predict?project_id=' + projectId, d1);
      console.log('predict res=', res);
      const { data } = res;
      console.log('predict data=', res);
      const { predictDict } = data;
      console.log('predict predictDict=', res);
      setPrediction(predictDict);
    } catch (err) {
      console.log(err)
    }
  }


  const displayFeature = (feature) => {
    return (
      <TextField
        required
        id={feature}
        label={feature}
        name={feature}
        defaultValue=""
        variant="standard"
        onChange={inputChangedHandler}
      />
    );
  }

  const displayPrediction = (p) => {
    return (
      <TableRow>
        <TableCell align="right">{p}</TableCell>
        <TableCell align="right">{prediction[p]}</TableCell>
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

              PREDICT

              {project ? (
                features.map(feature => displayFeature(feature))
              ) : (<CircularProgress />)
              }


              <Button variant="outlined" onClick={predictHandler} >
                Predict
              </Button>

              PREDICTIO RESULTS

              <TableContainer >
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Algorithm Name</TableCell>
                      <TableCell align="right">Prediction</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {project ? (
                      Object.keys(prediction).map(p => displayPrediction(p))
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

export default Predict;
