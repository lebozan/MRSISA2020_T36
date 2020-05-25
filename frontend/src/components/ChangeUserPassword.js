import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// component for changing current user's password
export default function ChangeUserPassword() {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = React.useState('');
  const cookies = new Cookies();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitNewPassword = () => {
    if (newPassword !== newPasswordRepeat) {
      alert('Password repeat field does not match new password!');
      return;
    }

    var data = {
      newPassword,
    }

    if (cookies.get('role') === 'doctor') {
      data.doctorId = cookies.get('doctorId');
    } else if (cookies.get('role') === 'clinicAdmin') {
      data.clinicAdminId = cookies.get('clinicAdminId');
    }


    axios.put('http://localhost:8080/api/' + cookies.get('role') + 's/updatePassword', data)
      .then(res => {
        if (res.data) {
          handleClose();
          alert('Your password is successfully changed!');
        } else {
          alert('Old password does not match!');
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Change password
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your old password and new password you want.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Old password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="New password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="newPasswordRepeat"
            label="Repeat new password"
            type='password'
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitNewPassword} color="primary">
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
