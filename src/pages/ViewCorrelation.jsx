/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import Buffer from "Buffer";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from '../components/ProjectHeader';
import EnhancedTable from '../components/EnhancedTable';
import { makeStyles } from '@mui/styles';
import Notification from "../components/Notification";


const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: "15px",
    margin: "20px"
  },
}));

const headCells = [
  { id: 'feature1', numeric: false, disablePadding: true, label: 'Feature 1' },
  { id: 'feature2', numeric: false, disablePadding: true, label: 'Feature 2' },
  { id: 'correlation', numeric: true, disablePadding: false, label: 'Correlation' },
];


const ViewCorrelation = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  //const [correlation, setCorrelation] = useState("data:image/png;base64, " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
  const [correlation, setCorrelation] = useState("waiting");
  const [correlationList, setCorrelationList] = useState([]);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })

  useEffect(() => {
    console.log("ViewCorrelation useEffect stated")
    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      console.log("ViewCorrelation useEffect project=", data)
      setProject(data);
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({
        isOpen: true,
        message: msg,
        type: 'error'
      })
    });

    axios({
      method: 'get',
      url: 'http://apiserver:8000/projects/correlation/' + projectId,
      responseType: 'blob'
    })
      .then(function (res) {
        const reader = new FileReader();
        let base64 = "";
        reader.addEventListener('loadend', (e) => {
          base64 = e.srcElement.result;
          console.log(base64);
          setCorrelation("data:image/png;base64," + base64);
        });
        reader.readAsText(res.data);
        console.log("res=", res);
        console.log("base64=", base64);
        //setCorrelation("data:image/png;base64, " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
      }).catch(function (error) {
        let msg = 'Plot project failed=' + error;
        setNotify({
          isOpen: true,
          message: msg,
          type: 'error'
        })
      });

    api.get('/projects/correlation_values/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      console.log("ViewCorrelation useEffect project=", data)
      setCorrelationList(data);
      console.log("data", data)
    }).catch(function (error) {
      let msg = 'Plot project failed=' + error;
      setNotify({
        isOpen: true,
        message: msg,
        type: 'error'
      })
    });



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

  const displayCorrelation = (correlation) => {
    return (
      <TableRow key={correlation[0]}>
        <TableCell align="right">{correlation[0]}</TableCell>
        <TableCell align="right">{correlation[1]}</TableCell>
        <TableCell align="right">{correlation[2]}</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Grid container spacing={1} >
        <ProjectHeader project={project} />
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Typography variant="h4" gutterBottom> Feature Correlation </Typography>
            <Typography variant="body1" gutterBottom>
              {console.log("correlation=", correlation)}
              <img src={correlation} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.pageContent}  >
            <Typography variant="h4" gutterBottom> Feature Correlation List</Typography>
            <EnhancedTable headCells={headCells} correlationList={correlationList} />
          </Paper>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />

    </>
  );
};

export default ViewCorrelation;
