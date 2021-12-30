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
import { Box, Grid, IconButton, Typography, CircularProgress, Toolbar, AppBar, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

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
    { name: "Project List", icon: <SubjectOutlined color="primary" />, path: '/' },
  ];
  const projectItems = [
    { name: "Set Data File", icon: <SubjectOutlined color="primary" />, path: '/project/set_data_file/' + projectId },
    { name: "Set Parameters", icon: <SubjectOutlined color="primary" />, path: '/project/set_parameters/' + projectId },
    { name: "View Correlation", icon: <SubjectOutlined color="primary" />, path: '/project/view_correlation/' + projectId },
    { name: "View Model", icon: <SubjectOutlined color="primary" />, path: '/project/view_model/' + projectId },
    { name: "Predict", icon: <SubjectOutlined color="primary" />, path: '/project/predict/' + projectId },
    { name: "View Data", icon: <SubjectOutlined color="primary" />, path: '/project/view_data_file/' + projectId }
  ];

  const buildListItems = (item) => {
    const { name, icon, path } = item;

    return (
      <ListItem button key={name} onClick={() => history.push(path)}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
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
            <Typography variant="h4" className={classes.title}>
              
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
