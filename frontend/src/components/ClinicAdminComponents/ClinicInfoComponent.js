import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Typography from '@material-ui/core/Typography';


export default function ClinicInfoComponent() {
  const [open, setOpen] = React.useState(false);
  const [clinicInfo, setClinicInfo] = React.useState({});
  var cookies = new Cookies();


  React.useEffect(() => {
    var clinicId = cookies.get('clinicId');
    axios.get('http://localhost:8080/api/clinics/getInfo?clinicId=' + clinicId)
      .then((res) => {
        setClinicInfo(res.data);
      })
      .catch(error => console.log(error));
      // eslint-disable-next-line
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitClinicInfoChange = () => {
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var address = document.getElementById('address').value;

    if (name === '' && description === '' && address === '') {
      alert('At least one change must be entered before submiting!');
      return;
    }

    var changes = {};

    if (name !== '') {
      changes['name'] = name;
    } else {
      changes['name'] = clinicInfo.name
    }
    
    if (description !== '') {
      changes['description'] = description;
    } else {
      changes['description'] = clinicInfo.description
    }

    if (address !== '') {
      changes['address'] = address;
    } else {
      changes['address'] = clinicInfo.address
    }
    
    changes['clinicId'] = cookies.get('clinicId');

    axios.put('http://localhost:8080/api/clinics/updateInfo', changes)
      .then((res) => {
        if (res.data) {
          setClinicInfo(changes);
          handleClose();
        }

      })
      .catch(error => console.log(error));

  }


  return (
    <div>
      <Grid container justify="space-around">
        <Typography>
          Clinic name: {clinicInfo.name}
        </Typography>
        <Typography>
          Clinic description: {clinicInfo.description}
        </Typography>
        <Typography>
          Clinic address: {clinicInfo.address}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Change clinic info
        </Button>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change clinic info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change information about the clinic you are admin of. Only fill fields you want to change.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Clinic name"
            defaultValue=''
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Clinic description"
            defaultValue=''
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Clinic address"
            defaultValue=''
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitClinicInfoChange} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
