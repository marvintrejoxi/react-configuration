import React, { Component } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

// STYLES
import './App.css'

// LAYOUTS
import SiteLayout from './pages/components/layouts/SiteLayout';
import LoginLayout from './pages/components/layouts/LoginLayout';

// PAGES //
import Login from './pages/containers/Login';

// PROCESSES
import Processes from './pages/backoffice/processes/containers/Processes';
// CONSOLIDATEDS
import Consolidateds from './pages/backoffice/consolidateds/containers/Consolidateds'
// ASSIGNMENTS
import AssignmentsList from './pages/backoffice/assignments/containers/AssignmentsList'
// STORE
import Stores from './pages/backoffice/stores/containers/Stores';
// USERS
import UserList from './pages/backoffice/users/containers/UsersList';
import NewUser from './pages/backoffice/users/containers/NewUser';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <LoginLayout exact path='/admin/sign_in' component={Login} />
            <SiteLayout exact path='/' component={Processes} showHeaderMenu />
            <SiteLayout exact path='/consolidateds' component={Consolidateds} showHeaderMenu />
            <SiteLayout exact path='/assignments' component={AssignmentsList} showHeaderMenu />
            <SiteLayout exact path='/stores' component={Stores} />
            <SiteLayout exact path='/users' component={UserList} />
            <SiteLayout exact path='/users/new' component={NewUser} backButton={{url: '/users', message: 'Regresar a lista de usuarios'}}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
