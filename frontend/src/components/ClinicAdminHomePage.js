import React from 'react';
import {
  Route,
  useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClinicStaffList from './StaffComponents/ClinicStaffList';
import AppointmentTypesComponent from './ClinicAdminComponents/AppointmentTypesComponent';
import OneClickAppointmentComponent from './ClinicAdminComponents/OneClickAppointmentComponent';
import RequestedAppointmentsComponent from './ClinicAdminComponents/RequestedAppointmentsComponent';
import UserProfileComponent from './UserProfileComponent';
import ClinicRoomComponent from './ClinicAdminComponents/ClinicRoomComponent';
import ClinicPriceListComponent from './ClinicAdminComponents/ClinicPriceListComponent';
import Cookies from 'universal-cookie';
import ManageLeaveRequests from './ClinicAdminComponents/ManageLeaveRequests';
import Reports from './ReportComponents/Reports';
import axios from 'axios';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ClinicAdminHomePage() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const cookies = new Cookies();

  // cookies.set('clinicAdminId', 'ca1', {path:'/'});
  // cookies.set('clinicId', 1, {path:'/'});
  // cookies.set('role', 'clinicAdmin', {path:'/'});

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {

    // axios.post('http://localhost:8080/logout')
    //   .then(res => {

    //   })
    //   .catch(error => console.log(error));
    cookies.remove('role', {path: '/'});
    cookies.remove('clinicAdminId', {path: '/'});
    cookies.remove('clinicId', {path: '/'});
    cookies.remove('JSESSIONID', {path: '/'});
    goTo('/login');
  }

  function goTo(url) {
    history.push(url);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Clinic Admin Home Page
          </Typography>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  goTo('/clinicAdmin/acc');
                  handleClose();}}
                  >
                    Profile
                </MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => {goTo('/clinicAdmin/home')}}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/clinicStaff')}}>
              <ListItemText primary="Clinic staff" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/appointmentTypes')}}>
              <ListItemText primary="Appointment types" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/newOneClick')}}>
              <ListItemText primary="Add one-click appointment" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/requestedAppointments')}}>
              <ListItemText primary="Requested appointments" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/clinicRooms')}}>
              <ListItemText primary="Clinic rooms" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/managePriceLists')}}>
              <ListItemText primary="Manage clinic price lists" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/leaveRequests')}}>
              <ListItemText primary="Manage leave requests" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {goTo('/clinicAdmin/reports')}}>
              <ListItemText primary="View clinic reports" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar/>
          <Route path="/clinicAdmin/managePriceLists">
            <ClinicPriceListComponent />
          </Route>
          <Route path="/clinicAdmin/clinicRooms">
            <ClinicRoomComponent />
          </Route>
          <Route path="/clinicAdmin/clinicStaff">
            <ClinicStaffList />
          </Route>
          <Route path="/clinicAdmin/appointmentTypes">
            <AppointmentTypesComponent />
          </Route>
          <Route path="/clinicAdmin/newOneClick">
            <OneClickAppointmentComponent />
          </Route>
          <Route path="/clinicAdmin/requestedAppointments">
            <RequestedAppointmentsComponent />
          </Route>
          <Route path="/clinicAdmin/leaveRequests">
            <ManageLeaveRequests />
          </Route>
          <Route path="/clinicAdmin/reports">
            <Reports />
          </Route>
          <Route path="/clinicAdmin/acc">
            <UserProfileComponent />
          </Route>


      </main>
    </div>
  );
}
