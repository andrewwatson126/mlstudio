/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, Button } from "@material-ui/core";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Toolbar, AppBar, TextField, Container, Paper } from "@material-ui/core";
import mockProjectListData from "../data/mockProjectListData";
import axios from "axios";
import blankProjectData from "../data/blankProjectData";
import ProjectHeader from '../components/ProjectHeader';
import { makeStyles } from '@mui/styles';
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

const ViewPlot = props => {
  const { match } = props
  const { params } = match
  const { projectId } = params

  const classes = useStyles();

  const [project, setProject] = useState(blankProjectData);
  const [plotFileList, setPlotFileList] = useState([]);
  const [plot1, setPlot1] = useState([]);
  const [plot2, setPlot2] = useState([]);
  const [plot3, setPlot3] = useState([]);
  const [plot4, setPlot4] = useState([]);
  const [plot5, setPlot5] = useState([]);
  const [plot6, setPlot6] = useState([]);
  const [plotFileListLoaded, setPlotFileListLoaded] = useState(false);
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })


  useEffect(() => {
    api.get('/projects/' + projectId).then(function (res) {
      const { data } = res;
      setProject(data);
    }).catch(function (error) {
      let msg = 'Loading project failed=' + error;
      setNotify({
        isOpen: true,
        message: msg,
        type: 'error'
      })
    });

      api.get('/projects/plot/' + projectId + "?algorithm=1").then(function (res) {
        const { data } = res;
        console.log(res)
        console.log(res.data)
        setPlotFileList(data);
        setPlotFileListLoaded(true);
      }).catch(function (error) {
        let msg = 'Plot project failed=' + error;
        setNotify({
          isOpen: true,
          message: msg,
          type: 'error'
        })
      });
  
        plotFileList.map((pf, index) =>

          axios({
            method: 'get',
            url: 'http://apiserver:8000/projects/plot_file/' + projectId + '?plot_file_name=' + pf,
            responseType: 'blob'
          })
            .then(function (res) {
              const reader = new FileReader();
              let base64 = "";
              reader.addEventListener('loadend', (e) => {
                base64 = e.srcElement.result;
                console.log(base64);
                if (index == 0) { setPlot1("data:image/png;base64," + base64); }
                if (index == 1) { setPlot2("data:image/png;base64," + base64); }
                if (index == 2) { setPlot3("data:image/png;base64," + base64); }
                if (index == 3) { setPlot4("data:image/png;base64," + base64); }
                if (index == 4) { setPlot5("data:image/png;base64," + base64); }
                if (index == 5) { setPlot6("data:image/png;base64," + base64); }
              });
              reader.readAsText(res.data);
              console.log("res=", res);
              console.log("base64=", base64);
              //setCorrelation("data:image/png;base64, " + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
            })
        )

      }, [project.id, plotFileListLoaded]);


      return (
        <>
          <Grid container spacing={1} >
            <ProjectHeader project={project} />

            <Grid item xs={12}>
              <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                <Typography variant="h4" gutterBottom> Data Plots </Typography>
                <Typography variant="body1" gutterBottom>
                  <Grid container spacing={1} >
                    <Grid item xs={6} md={4}>
                      <img src={plot1} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <img src={plot2} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <img src={plot3} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <img src={plot4} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <img src={plot5} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <img src={plot6} />
                    </Grid>
                  </Grid>
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Notification notify={notify} setNotify={setNotify} />

        </>
      );
    };

    export default ViewPlot;
