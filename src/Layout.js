import React from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import Divider from '@mui/material/Divider';

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
    background: '#888888'
  },
})

export default function Layout({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const mainItems = [
    { name: "Project List", icon: <SubjectOutlined color="primary" />, path: '/' },
  ];
  const projectItems = [
    { name: "Set Parameters",   icon: <SubjectOutlined color="primary" />, path: '/parameters/1' },
    { name: "View Correlation", icon: <SubjectOutlined color="primary" />, path: '/1' },
    { name: "View Model",       icon: <SubjectOutlined color="primary" />, path: '/1' },
    { name: "Predict",          icon: <SubjectOutlined color="primary" />, path: '/1' },
    { name: "View Data",        icon: <SubjectOutlined color="primary" />, path: '/' }
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
        <div>
          <Typography variant="h5" className={classes.title}>
            ML Studio
          </Typography>
        </div>

        {/* links/list section */}
        <List>
        { mainItems.map((item) => ( buildListItems(item))) }
        </List>
        <Divider />
        <List>
        { projectItems.map((item) => ( buildListItems(item))) }
        </List>
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        { children }
      </div>
    </div>
  )
}
