import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CreateProject from "../component/CreateProject";
import mockProjectListData from "../data/mockProjectListData";
import { useHistory, useLocation } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  projectListContainer: {
    backgroundColor: theme.palette.common.white,
    paddingTop: "20px",
    margin: "20px",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}));


const handleCreateProject = () => {
  console.log("handleCreateProject");
  { <CreateProject open='true' /> }
}


const ProjectList = () => {
  const classes = useStyles();
  const history = useHistory();

  const [projectListData, setProjectListData] = useState(mockProjectListData);
  const [openCreateProject, setOpenCreateProject] = useState(false)

  const handleCreateProject = (open) => {
    console.log(open);
    setOpenCreateProject(open);
  }

  const getProjectListRow = (projectId) => {
    console.log(projectListData[{ projectId }.projectId]);
    const { id, name, createdBy, createdDate, description } = projectListData[{ projectId }.projectId];
    return (
      <TableRow key={projectId}>
        <TableCell component="th" scope="row">{id}</TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{createdBy}</TableCell>
        <TableCell align="right">{createdDate}</TableCell>
        <TableCell align="right">{description}</TableCell>
        <TableCell align="right"><Button variant="contained" onClick={() => history.push('/' + { projectId }.projectId)}>View Project</Button></TableCell>
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

            <Button variant="contained" onClick={() => { handleCreateProject(true); }} >Create Project</Button>


          </Paper>
        </Grid>
        <Grid item xs={false}></Grid>
      </Grid>

      <CreateProject openCreateProject={openCreateProject} setOpenCreateProject={setOpenCreateProject} />
    </>
  );
};

export default ProjectList;
