/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Divider, FormHelperText, Select, MenuItem, Radio, FormControlLabel, FormLabel, FormGroup, FormControl, RadioGroup, Typography, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
/* 
import { makeStyles } from "@material-ui/core/styles";
*/
import { makeStyles } from '@mui/styles';
import ProjectHeader from '../components/ProjectHeader';

const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})

const useStyles = makeStyles((theme) => ({
  pageContent: {
    paddingTop: "20px",
    margin: "20px",
    height: "100%"
  },
  form: {
    width: '90%',
    // margin: theme.spacing(1)
  }
}));


const Predict = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(mockProjectListData[projectId]);
  const [features, setFeatures] = useState([]);
  const [values, setValues] = useState({});
  const [prediction, setPrediction] = useState({});


  useEffect(() => {
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
      //values.map((value => d2.push(value)))
      Object.keys(values).map(name => d2.push(values[name]))
      d1.push(d2)

      console.log('d2=', d2)
      console.log('d1=', d1)
      /*
      let d1 = []
      let d2 = []
      d1.push(d2)
      d2.push(1)
      d2.push(2)
      d2.push(3)
      d2.push(4)
      */
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
      <Grid item xs={4} >
        <TextField 
          required
          id={feature} 
          label={feature} 
          name={feature} 
          variant="outlined" 
          onChange={inputChangedHandler} 
          className={classes.form} />
      </Grid>
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
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      <Grid container spacing={4} >
        <ProjectHeader project={project} />

        <Grid item xs={12}  >
          <Paper className={classes.pageContent} sx={{ p: 10,  display: 'flex', flexDirection: 'column' }} >
            <Typography variant="h4" gutterBottom> Predict </Typography>
            <Typography variant="body1" gutterBottom>

              <Grid container spacing={1} >
                {project ? (
                  features.map(feature => displayFeature(feature))
                ) : (<CircularProgress />)
                }

                <Grid item xs={12} >
                  <Button variant="contained" color="primary" onClick={predictHandler} >
                    Predict
                  </Button>
                </Grid>

              </Grid>

            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} >

          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <Typography variant="h4" gutterBottom> Prediction Results </Typography>
            <Typography variant="body1" gutterBottom>

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

            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Predict;
