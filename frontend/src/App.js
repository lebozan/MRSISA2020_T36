import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ClinicAdminHomePage from './components/ClinicAdminHomePage';
import UserProfileComponent from './components/UserProfileComponent';
import Login from './components/AccountComponents/LoginComponent';
import Register from './components/AccountComponents/RegisterComponent';
import DoctorHomePage from './components/DoctorComponents/DoctorHomePage';


function Home() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/doctor/home">Doctor home page</Link>
        </li>
        <li>
          <Link to="/ca/home">Clinic admin home page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {

  return (
      <div>

        <Switch>

{/* clinic admin home page */}
          <Route path="/ca/*">
            <ClinicAdminHomePage />
          </Route>

{/* doctor home page */}
          <Route path="/doctor/*">
            <DoctorHomePage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/acc">
            <UserProfileComponent />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            * 404 NOT FOUND *
          </Route>
        </Switch>
      </div>
  );
}