import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClinicInfoComponent from './ClinicAdminComponents/ClinicInfoComponent';
import ChangeUserPassword from './ChangeUserPassword';

// Component for displaying current user's basic info and clinic info for clinic admin
export default function UserProfileComponent() {
  const [user, setUser] = React.useState({});
  const [showEditFields, setShowEditFields] = React.useState(false)
  const editFields = ['edit First Name', 'edit Last Name', 'edit Email', 'edit Age', 'edit Address'];
  var cookies = new Cookies();

  // get current logged in user's data from backend
  React.useEffect(() => {
    let role = cookies.get('role');
    axios.get('http://localhost:8080/api/' + role + 's/getOne?' + role + 'Id=' + cookies.get(role + 'Id'), {withCredentials: true})
      .then((res) => {
        setUser(res.data);
      })
      .catch(error => console.log(error));
      // eslint-disable-next-line
  }, []);
  
  const editInfo = () => {
    setShowEditFields(true);
  }

  const submitChanges = () => {
    var firstName = document.getElementById('editFirstName').value;
    var lastName = document.getElementById('editLastName').value;
    var age = parseInt(document.getElementById('editAge').value);
    var address = document.getElementById('editAddress').value;
    var email = document.getElementById('editEmail').value;

    var changes = {};

    if (firstName !== '') {
      changes['firstName'] = firstName;
    }
    
    if (lastName !== '') {
      changes['lastName'] = lastName;
    }

    if (!isNaN(age)) {
      changes['age'] = age;
    }

    if (address !== '') {
      changes['address'] = address;
    }

    if (email !== '') {
      changes['email'] = email;
    }
    
    if (cookies.get('role') === 'doctor') {
      changes['doctorId'] = cookies.get('doctorId');
    } else if (cookies.get('role') === 'clinicAdmin') {
      changes['clinicAdminId'] = cookies.get('clinicAdminId');
    }

    var role = cookies.get('role');
    axios.put('http://localhost:8080/api/' + role + 's/updateInfo', changes, {withCredentials: true})
      .then((res) => {
        setUser(res.data);
        setShowEditFields(false);
      })
      .catch(error => console.log(error));
  }


  return (
    <div>
      <Grid container justify="space-around">
          <Typography>
            User: {user.firstName + " " + user.lastName}
          </Typography>
          <Typography>
            Email: {user.email}
          </Typography>
          <Typography>
            Age: {user.age}
          </Typography>
          <Typography>
            Address: {user.address}
          </Typography>
          <Button 
            variant="contained"
            color="primary"
            onClick={editInfo}
            >
            Edit user info
          </Button>
        </Grid>
        <br/>
        <Grid container justify="space-around">
          {showEditFields ? editFields.map((field) => (
            <React.Fragment>
              <TextField
                required
                key={field}
                id={field.replace(/\s/g,'')}
                label={field}
                defaultValue=""
                variant="filled"
              />
            </React.Fragment>
            
          )) : null }
          {showEditFields ? 
            <React.Fragment>
              <Button 
                variant="contained"
                color="primary"
                onClick={submitChanges}
                >
                Submit
              </Button>
              <Button 
              variant="contained"
              color="primary"
              onClick={() => {setShowEditFields(false);}}
              >
              Cancel
            </Button>
            </React.Fragment>
               : null}
        </Grid>
        <br/>
        {cookies.get('role') === 'clinicAdmin' ?
        <ClinicInfoComponent /> : null }
        <br />
        <ChangeUserPassword />
        
    </div>
  )
}
