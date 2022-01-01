import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
/* 
import { makeStyles } from "@material-ui/core/styles";
*/
import { makeStyles } from '@mui/styles';
import { Grid, Typography, CircularProgress, Toolbar, AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import axios from "axios";
import CreateProject from "../components/CreateProject";
import Notification from "../components/Notification";
import mockProjectListData from "../data/mockProjectListData";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';

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


const ProjectList = (props) => {
  console.log('ProjectList props=', props)
  const { match } = props
  const { params } = match
  const { projectId } = params
  const { setProjectId } = props


  const classes = useStyles();
  const history = useHistory();

  const [projectListData, setProjectListData] = useState([]);
  const [openCreateProject, setOpenCreateProject] = useState(false)
  const [deleteProject, setDeleteProject] = useState(false)
  const [notify, setNotify] = useState({ isOpen: true, message: '', type: '' })

  useEffect(() => {
    api.get('/projects').then(function (response) {
      const { data } = response;
      setProjectListData(data);
    })

    setDeleteProject(false);
  }, [openCreateProject, deleteProject]);

  const handleCreateProject = (open) => {
    console.log('open=' + open);
    setOpenCreateProject(open);
  }

  const viewProjectHandler = (id) => {
    console.log("viewProjectHandler setProjectId(", id, ")");
    setProjectId(id);
    history.push('/project/set_data_file/' + id);
  }

  const deleteProjectHandler = (id) => {
    console.log("viewProjectHandler setProjectId(", id, ")");
    setProjectId(id);

    api.delete('/projects/' + id)
      .then(function (response) {
        const { data } = response;
        setDeleteProject(true);
        setNotify({
          isOpen: true,
          message: 'Project deleted successfully',
          type: 'success'
      })

      }).catch(function (error) {
        let msg = 'Project could not be deleted error=' + error;
        setNotify({
          isOpen: true,
          message: msg,
          type: 'error'
      })
      console.log(error);
      });

  }

  const getProjectListRow = (projectId) => {
    console.log(projectListData[{ projectId }.projectId]);
    const { id, name, created_by, created_date, description, data_file } = projectListData[{ projectId }.projectId];
    return (
      <TableRow key={projectId}>
        <TableCell component="th" scope="row">{id}</TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{created_by}</TableCell>
        <TableCell align="right">{created_date}</TableCell>
        <TableCell align="right">{data_file}</TableCell>
        <TableCell align="right">
          <Button variant="contained" onClick={() => viewProjectHandler(id)}><PreviewIcon /></Button>
          <Button variant="contained" onClick={() => deleteProjectHandler(id)}><DeleteIcon /></Button>
        </TableCell>
      </TableRow>
    );
  };

  const getProjectListHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Project Id</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Created By</TableCell>
          <TableCell align="right">Created Date</TableCell>
          <TableCell align="right">Data File</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
    );
  };

  return (
    <>
      <Grid container spacing={4} >
        <Grid item xs={false}></Grid>
        <Grid item xs={12}>
          <Paper className={classes.pageContent} sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
            <div style={{ display: 'flex' }}>
              <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>Project List </Typography>
              <Button variant="contained" color="primary" onClick={() => { handleCreateProject(true); }} >Create Project</Button>
            </div>


            <TableContainer >
              <Table >
                {getProjectListHeader()}
                <TableBody>
                  {projectListData ? (
                    Object.keys(projectListData).map(projectId => getProjectListRow(projectId))
                  ) : (<CircularProgress />)
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={false}></Grid>
      </Grid>

      <CreateProject openCreateProject={openCreateProject} setOpenCreateProject={setOpenCreateProject} />

      <Notification notify={notify} setNotify={setNotify} />

    </>
  );
};

export default ProjectList;
