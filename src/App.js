import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProjectList from "./pages/ProjectList";
import Project from "./pages/Project";
import DataFile from "./pages/DataFile";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './Layout';
import Parameters from './pages/Parameters';
import ViewModel from './pages/ViewModel';
import Predict from './pages/Predict';
import ViewCorrelation from './pages/ViewCorrelation';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefe00'
    },
    secondary: purple
  },
}
)

const App = () => (
  <ThemeProvider theme={theme}>
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" render={(props) => <ProjectList {...props} />} />          
        <Route exact path="/:projectId" render={(props) => <Project {...props} />} />
        <Route exact path="/project/set_data_file/:projectId" render={(props) => <DataFile {...props} />} />
        <Route exact path="/project/set_parameters/:projectId" render={(props) => <Parameters {...props} />} />
        <Route exact path="/project/view_correlation/:projectId" render={(props) => <ViewCorrelation {...props} />} />
        <Route exact path="/project/view_model/:projectId" render={(props) => <ViewModel {...props} />} />
        <Route exact path="/project/predict/:projectId" render={(props) => <Predict {...props} />} />
        <Route exact path="/project/view_data_file/:projectId" render={(props) => <Project {...props} />} />
      </Switch>
    </Layout>
  </Router>
</ThemeProvider>
);

export default App;