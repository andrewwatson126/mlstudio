import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProjectList from "./pages/ProjectList";
import Project from "./pages/Project";
import DataFile from "./pages/DataFile";
//import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@material-ui/core/colors';
import Layout from './Layout';
import Parameters from './pages/Parameters';
import ViewModel from './pages/ViewModel';
import Predict from './pages/Predict';
import ViewCorrelation from './pages/ViewCorrelation';
import ViewData from './pages/ViewData';

//const theme = createMuiTheme({
const theme = createTheme({

  palette: {
    /*
    primary: {
      main: '#fefe00'
    },
    secondary: purple
    */
  },
  typography: {
    fontFamily: 'Segoe UI',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
}
)



const App = (props) => {


  const [projectId, setProjectId] = useState();

  return (
    <>

      <ThemeProvider theme={theme}>
        <Router>
          <Layout projectId={projectId}>
            <Switch>
            {console.log('App=', props, "<----------------------------------------------------")}
            {console.log('App=', typeof(props), "<----------------------------------------------------")}
            {console.log('App= projectId=', projectId, "<----------------------------------------------------")}

              <Route exact path="/" render={(props) => <ProjectList {...props} setProjectId={setProjectId} />} />
              <Route exact path="/:projectId" render={(props) => <Project {...props} />} />
              <Route exact path="/project/set_data_file/:projectId" render={(props) => <DataFile {...props} />} />
              <Route exact path="/project/set_parameters/:projectId" render={(props) => <Parameters {...props} />} />
              <Route exact path="/project/view_correlation/:projectId" render={(props) => <ViewCorrelation {...props} />} />
              <Route exact path="/project/view_model/:projectId" render={(props) => <ViewModel {...props} />} />
              <Route exact path="/project/predict/:projectId" render={(props) => <Predict {...props} />} />
              <Route exact path="/project/view_data_file/:projectId" render={(props) => <ViewData {...props} />} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
};


export default App;