import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/projects/Projects';
import Users from './components/admin/Users';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import SpinnerState from './context/spinner/spinnerState';
import UsersState from './context/users/usersState';
import authToken from './config/token';
import PrivateRoute from './components/routes/PrivateRoute';
import PrivateRouteAdmin from './components/routes/PrivateRouteAdmin';
import UpdateUser from './components/users/UpdateUser';

// Revisar si hay token
const token = localStorage.getItem('token');
if (token) {
  authToken(token);
}

function App() {
  return (

    <ProjectState>
      <TaskState>
        <AlertState>
          <UsersState>
            <AuthState>
              <SpinnerState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />

                    <PrivateRoute exact path="/projects" component={Projects} />
                    <PrivateRoute exact path="/update-user/:id" component={UpdateUser} />
                    <PrivateRouteAdmin exact path="/users" component={Users} />
                  </Switch>
                </Router>
              </SpinnerState>
            </AuthState>
          </UsersState>
        </AlertState>
      </TaskState>
    </ProjectState>

  );
}

export default App;
