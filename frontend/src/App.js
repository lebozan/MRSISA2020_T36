import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ClinicAdminHomePage from './components/ClinicAdminHomePage';
import Login from './components/AccountComponents/LoginComponent';
import Register from './components/AccountComponents/RegisterComponent';
import DoctorHomePage from './components/DoctorComponents/DoctorHomePage';
import ProtectedRoute from './components/ProtectedRoute';


export default function App() {

  return (
      <div>
        <Switch>

{/* clinic admin routes */}
          <Route path="/clinicAdmin/*">
            <ProtectedRoute component={<ClinicAdminHomePage />} />
          </Route>

{/* doctor routes */}
          <Route path="/doctor/*">
            <ProtectedRoute component={<DoctorHomePage />} />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route>
            * 404 NOT FOUND *
          </Route>
        </Switch>
      </div>
  );
}