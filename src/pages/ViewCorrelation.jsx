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


const ViewCorrelation = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params


  const [project, setProject] = useState(blankProjectData);
  const [correlation, setCorrelation] = useState();

  useEffect(() => {

    let projectId = 1;

    api.get('/projects/' + projectId).then(function (response) {
      const { data } = response;
      console.log("!!! useEffect  project=", data);
      setProject(data);
    });


    axios({
      method: 'get',
      url: 'http://apiserver:8000/projects/correlation/' + projectId,
      responseType: 'blob'
    })
      .then(function (res) {
        //const base64 = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        //const base64 = Buffer.from(res.data, "binary").toString("base64")
        //const base64 = btoa(res.data)
        //const myarray = new Uint8Array(res.data);
        //const myarray = res.data.arrayBuffer();
        //console.log("myarray=", myarray)
        //const base64 = btoa(uint8ToString(myarray));
        //const base64 = await convertBlobtoBase64(res.data)
        const d = toBinary(res.data.arrayBuffer)
        console.log("d=", d);
        const base64 = btoa(d)
        //const base64 = btoa(res.data.Uint8Array)
        console.log("res.data.arrayBuffer=", res.data.arrayBuffer);
        console.log("res.data=", res.data);
        console.log("base64=", base64);
        setCorrelation("data:image/png;base64," + " " + base64);
        //setCorrelation("data:image/png;base64," + " " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
      })


  }, [project.id]);

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
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      <Grid container spacing={9} >
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

              CORRELATION

              {console.log("correlation=", correlation)}
              <img src={correlation} />

            </Paper>
          </Grid>
        </Grid>
    </>
  );
};

export default ViewCorrelation;
