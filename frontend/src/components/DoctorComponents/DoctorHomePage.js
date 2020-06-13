import React from 'react'
import {
  Route,
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
import { useHistory } from 'react-router-dom';
import MakeAppointmentDoctorComponent from './MakeAppointmentDoctorComponent';
import LeaveRequest from '../StaffComponents/LeaveRequest';
import PatientSearch from './PatientSearch';
import UserProfileComponent from '../UserProfileComponent';
import Cookies from 'universal-cookie';


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

export default function DoctorHomePage() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const cookies = new Cookies();

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    cookies.remove('role', {path: '/'});
    cookies.remove('doctorId', {path: '/'});
    cookies.remove('JSESSIONID', {path: '/'});
    goTo('/login');
  }

  const goTo = (url) => {
    history.push(url);
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Doctor Home Page
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
                  goTo('/doctor/acc');
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
            {['Home', 'Calendar', 'Patient List', 'Request leave', 'New Appointment'].map((text) => (
              <ListItem button key={text} onClick={() => {goTo('/doctor/' +  text.toString().replace(/\s/g,'').toLowerCase())}}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar/>
          <Route path="/doctor/calendar">
            Calendar
          </Route>
          <Route path="/doctor/patientlist">
            <PatientSearch />
          </Route>
          <Route path="/doctor/newAppointment">
            <MakeAppointmentDoctorComponent />
          </Route>
          <Route path="/doctor/requestleave">
            <LeaveRequest />
          </Route>
          <Route path="/doctor/acc">
            <UserProfileComponent />
          </Route>
      </main>
    </div>
  )
}
