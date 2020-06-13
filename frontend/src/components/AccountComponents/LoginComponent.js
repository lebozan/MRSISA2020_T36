import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, useHistory} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  export default function LogIn() {
    const classes = useStyles();
    const cookies = new Cookies();
    let history = useHistory();
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [rememberCheck, setRememberCheck] = React.useState(false);
    const [emailErrorText, setEmailErrorText] = React.useState('');
    const [passwordErrorText, setPasswordErrorText] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const sendCredentials = () => {
      if (emailInput === '') {
        setEmailError(true);
        setEmailErrorText('Email must be entered!');
      } else {
        setEmailError(false);
        setEmailErrorText('');
      }
      
      if (passwordInput === '') {
        setPasswordError(true);
        setPasswordErrorText('Password must be entered!');
      } else {
        setPasswordError(false);
        setPasswordErrorText('');
      }

      if (emailInput === '' || passwordInput === '') {
        return;
      }

      var credentials = {
        email: emailInput,
        password: passwordInput,
        remember: rememberCheck
      }

      axios.post('http://localhost:8080/public/login', credentials, {withCredentials: 'true'})
        .then(res => {
          if (res.data) {
            var user = res.data;
            if (user.role === 'clinicAdmin' || user.role === 'doctor') {
              cookies.set('clinicId', user.clinicId, {path: '/'});
            }
            cookies.set('role', user.role, {path: '/'});
            cookies.set(user.role + 'Id', user.id, {path: '/'});
            // cookies.set('JSESSIONID', user.session, {path: '/', httpOnly: true});
            if (user.role === 'doctor') {
              history.push('/doctor/home');
            } else if (user.role === 'clinicAdmin') {
              history.push('/clinicAdmin/home');
            } else if (user.role === 'patient') {
  
            } else if (user.role === 'clinicCenterAdmin') {
  
            }
          } else {
            setEmailError(true);
            setEmailErrorText('Incorrect email!');
            setPasswordError(true);
            setPasswordErrorText('Incorrect password!');
          }
          
        })
        .catch(error => console.log(error));

    }
   
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {setEmailInput(event.target.value)}}
            helperText={emailErrorText}
            error={emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {setPasswordInput(event.target.value)}}
            helperText={passwordErrorText}
            error={passwordError}
          />
          <Grid container justify='flex-start'>
            <FormControlLabel
              control={<Checkbox value="remember" onChange={(event) => {setRememberCheck(event.target.checked)}} color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendCredentials}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotPassword">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }