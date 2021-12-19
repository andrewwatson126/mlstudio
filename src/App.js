import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProjectList from "./pages/ProjectList";
import Project from "./pages/Project";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './Layout';
import Parameters from './pages/Parameters';

// <Switch>
// <Route exact path="/" render={(props) => <ProjectList {...props} />} />
//<Route exact path="/dash" render={(props) => <Dashboard {...props} />} />
//<Route
//  exact
//  path="/:projectId"
//  render={(props) => <Project {...props} />}
///>
//</Switch>

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    //fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
}
)

const App = () => (
  <ThemeProvider theme={theme}>
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" render={(props) => <ProjectList {...props} />} />          
        <Route exact path="/:projectId" render={(props) => <Project {...props} />} />
        <Route exact path="/parameters/:projectId" render={(props) => <Parameters {...props} />} />
      </Switch>
    </Layout>
  </Router>
</ThemeProvider>
);

export default App;
