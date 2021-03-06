import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import sherlock from "./images/sherlock.png";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import DataArrayIcon from '@mui/icons-material/DataArray';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { Box, Grid, IconButton, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Link from '@mui/material/Link';
import MovingIcon from '@mui/icons-material/Moving';

const drawerWidth = 240

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    /*
    background: '#888888'
    */
  },
  title: {
    flexGrow: 1
  },
  list: {
    marginTop: "40px"
  }
})

// export default function Layout( { children })  {
//export default function Layout() {
const Layout = props => {
  const { match } = props
  const { projectId } = props
  const { children } = props

  console.log('***************************************Layout projectId=', projectId)

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const mainItems = [
    { type: "link", name: "Project List", icon: <SubjectOutlined color="primary" />, path: '/' },
  ];
  const projectItems = [
    { type: "caption", name: "Prepare Data" },
    { type: "link", name: "Set Data File", icon: <FileUploadIcon color="primary" />, path: '/project/set_data_file/' + projectId },
    { type: "caption", name: "Build Model" },
    { type: "link", name: "Set Parameters", icon: <DisplaySettingsIcon color="primary" />, path: '/project/set_parameters/' + projectId },
    { type: "link", name: "View Model", icon: <ModelTrainingIcon color="primary" />, path: '/project/view_model/' + projectId },
    { type: "link", name: "View Correlation", icon: <CompareArrowsIcon color="primary" />, path: '/project/view_correlation/' + projectId },
    { type: "caption", name: "Get Insight" },
    { type: "link", name: "View Plot", icon: <ScatterPlotIcon color="primary" />, path: '/project/view_plot/' + projectId },
    { type: "link", name: "ROC Curve", icon: <MovingIcon color="primary" />, path: '/project/roc/' + projectId },
    { type: "link", name: "View Data", icon: <DataArrayIcon color="primary" />, path: '/project/view_data_file/' + projectId },
    { type: "link", name: "Predict", icon: <OnlinePredictionIcon color="primary" />, path: '/project/predict/' + projectId }
  ];

  const buildListItems = (item) => {
    const { type, name, icon, path } = item;

    console.log("type=", type)
    if(type == "caption") {
      return (
        <ListItem>
          <ListItemText>
          <Typography variant="overline" className={classes.title}>{name}</Typography>          
          </ListItemText>
        </ListItem>
      );
      } else {

    return (
      <ListItem button key={name} onClick={() => history.push(path)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  }
  };


  return (
    <div className={classes.root}>
      {/* app bar */}

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <AppBar position="static">
          <Toolbar >
            <Typography variant="h4" className={classes.title}>
              ML Studio
            </Typography>
          </Toolbar>
        </AppBar>

        {/* links/list section */}
        <List>
          {mainItems.map((item) => (buildListItems(item)))}
        </List>
        <Divider />
        <List>
          {projectItems.map((item) => (buildListItems(item)))}
        </List>

      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <AppBar position="static">
          <Toolbar >
            <Typography variant="body1" className={classes.title}>
            <Link href="https://docs.google.com/presentation/d/16F10j2T9tD0VdkHqj9016Y0vcFNdQxNiyYaxQlK5zxQ/edit#slide=id.g108c567d1d7_0_9">mlstudio</Link>
            </Typography>

            <Avatar alt="Sherlock" src={sherlock} />
          </Toolbar>
        </AppBar>
        {children}
      </div>
    </div >
  );
};

export default Layout;
