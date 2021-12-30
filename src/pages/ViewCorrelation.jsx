/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import Buffer from "Buffer";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from '../components/ProjectHeader';
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

const ViewCorrelation = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  //const [correlation, setCorrelation] = useState("data:image/png;base64, " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
  const [correlation, setCorrelation] = useState("waiting");

  useEffect(() => {
    console.log("ViewCorrelation useEffect stated")
    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      console.log("ViewCorrelation useEffect project=", data)
      setProject(data);
    });

    axios({
      method: 'get',
      url: 'http://apiserver:8000/projects/correlation/' + projectId,
      responseType: 'blob'
    })
      .then(function (res) {
        const reader = new FileReader();
        let  base64 = "";
        reader.addEventListener('loadend', (e) => {
           base64 = e.srcElement.result;
          console.log(base64);
          setCorrelation("data:image/png;base64," + base64);
        });
        reader.readAsText(res.data);
        console.log("res=", res);
        console.log("base64=", base64);
        //setCorrelation("data:image/png;base64, " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
      })


  }, []);

  function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = '';
    for (let i = 0; i < charCodes.byteLength; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
  }

 

  const uint8ToString = (buf) => {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
      out += String.fromCharCode(buf[i]);
    }
    console.log("buf=", buf)
    console.log("out=", out)
    return out;
  }

  const convertBlobtoBase64 = async (blob) => {
    return await blobtoBase64(blob);
  }

  const blobtoBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


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
    { /*
      <AppBar position="static">
        <Toolbar />
      </AppBar>
    */ }

      <Grid container spacing={9} >
        <ProjectHeader project={project} />

        <Grid item xs={12}>
          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <Typography variant="h4" gutterBottom> Feature Correlation </Typography>
            <Typography variant="body1" gutterBottom>
              {console.log("correlation=", correlation)}
              <img src={correlation} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewCorrelation;
