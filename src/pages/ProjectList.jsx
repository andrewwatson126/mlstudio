import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CreateProject from "../components/CreateProject";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'



const api = axios.create({
  baseURL: 'http://apiserver:8000/'
})





const useStyles = makeStyles((theme) => ({
  projectListContainer: {
    /*
    backgroundColor: theme.palette.common.white,
    paddingTop: "20px",
    margin: "20px",
    */
  },
  pageContent: {
    /*
    margin: theme.spacing(5),
    padding: theme.spacing(3)
    */
  },
  searchInput: {
    /*
    width: '75%'
    */
  },
  newButton: {
    /*
    position: 'absolute',
    right: '100px'
    */
  }
}));


const handleCreateProject = () => {
  console.log("handleCreateProject");
  { <CreateProject open='true' /> }
}


const ProjectList = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [projectListData, setProjectListData] = useState([]);
  const [openCreateProject, setOpenCreateProject] = useState(false)

  useEffect(() => {
    api.get('/projects').then(function (response) {
      const { data } = response;
      setProjectListData(data);
    })
  }, []);



  const handleCreateProject = (open) => {
    console.log(open);
    setOpenCreateProject(open);
  }

  const getProjectListRow = (projectId) => {
    console.log(projectListData[{ projectId }.projectId]);
    const { id, name, created_by, created_date, description } = projectListData[{ projectId }.projectId];
    return (
      <TableRow key={projectId}>
        <TableCell component="th" scope="row">{id}</TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{created_by}</TableCell>
        <TableCell align="right">{created_date}</TableCell>
        <TableCell align="right">{description}</TableCell>
        <TableCell align="right"><Button variant="contained" onClick={() => history.push('/project/set_data_file/' + id)}>View Project</Button></TableCell>
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
          <TableCell align="right">Description</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      <Grid container spacing={9} >
        <Grid item xs={false}></Grid>
        <Grid item xs={12}>
          <Paper className={classes.pageContent}>

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

            <Button variant="contained" color="primary" onClick={() => { handleCreateProject(true); }} >Create Project</Button>


          </Paper>
        </Grid>
        <Grid item xs={false}></Grid>
      </Grid>

      <CreateProject openCreateProject={openCreateProject} setOpenCreateProject={setOpenCreateProject} />
    </>
  );
};

export default ProjectList;
