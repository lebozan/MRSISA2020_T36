import React from 'react';
import {
  Switch,
  Route,
  Link
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
import ListComponent from "./ListComponent";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClinicStaffList from './ClinicStaffList';
import AppointmentTypesComponent from './AppointmentTypesComponent';

const drawerWidth = 240;

function Home() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <Link to="/">Home</Link>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>
          user1
        </li>
        <li>
          user2
        </li>
      </ul>
      <Link to="/">Home</Link>
    </div>
  );
}

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

export default function ClippedDrawer() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openMenu, setOpen] = React.useState(false);

  const history = useHistory();

  const handleClick = () => {
    setOpen(!openMenu);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function goTo(url) {
    history.push(url);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Clipped drawer
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
                <MenuItem onClick={() => {goTo('/acc')}}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
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
            {['Home', 'Calendar', 'Patient List', 'Vacation', 'Appointments'].map((text, index) => (
              <ListItem button key={text} onClick={() => {goTo('/' +  text.toString().replace(/\s/g,'').toLowerCase())}}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={handleClick}>
              <ListItemText primary="Clinic menu" />
              {openMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => {goTo('/clinicStaff')}}>
                  <ListItemText primary="Clinic staff" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => {goTo('/appointmentTypes')}}>
                  <ListItemText primary="Appointment types" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar/>
        <Switch>
          <Route path="/clinicStaff">
            <ClinicStaffList />
          </Route>
          <Route path="/appointmentTypes">
            <AppointmentTypesComponent />
          </Route>
          <Route path="/calendar">
            Calendar
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <ListComponent />
          </Route>
          <Route>
            *404 NOT FOUND *
          </Route>
        </Switch>

      </main>
    </div>
  );
}
