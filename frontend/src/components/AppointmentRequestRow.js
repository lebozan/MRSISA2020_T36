import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function SimpleDialog(props) {
  const { onClose, selectedRoom, open, rooms } = props;

  const handleClose = () => {
    onClose(selectedRoom);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Choose a room for appointment</DialogTitle>
      <List>
        {rooms.map((room) => (
          <ListItem button onClick={() => handleListItemClick(room)} key={room}>
            <ListItemText primary={room} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

export default function AppointmentRequestRow(props) {
  const {appointment, rooms, removeRequest} = props;
  const [open, setOpen] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date(appointment.changeDate));

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedRoom(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const confirmRequest = () => {
    // cenu izbaci odavde kad bude gotov cenovnik, dodeli se cena na osnovu tipa pregleda
    let newAppointment = {
      'startTime': new Date(appointment.startTime).getTime(),
      'duration': 30,
      'type': appointment.type,
      'doctorId':appointment.doctorId,
      'price':100,
      'room':selectedRoom,
      'patientId':appointment.patientId,
      'clinicId':1
    };
    console.log(newAppointment);
    if (appointment.changeDate) {
      let lesser = new Date(appointment.changeDate.getTime() - 1800000);
      let greater = new Date(appointment.changeDate.getTime() + 1800000);
      if (selectedDate > lesser && selectedDate < greater) {
        alert("Selected date is invalid! Select date at least 30 minutes before or after date limit!");
        return;
      }
    }


    axios.post('http://localhost:8080/api/clinics/confirmUA', newAppointment)
      .then((res) => {
        if (res.data) {
          cancelRequest(true);
        }
      })
      .catch(error => console.log(error));

  };
  

  const cancelRequest = (submited) => {
    axios.delete('http://localhost:8080/api/clinicAdmins/deleteUA?clinicAdminId=ca1&id=' + appointment.id)
      .then((res) => {
        if(res.data) {
          removeRequest();
          if (submited) {
            alert('Appointment successfully created');
          } else {
            alert('Appointment canceled');
          }
        }
      })
      .catch(error => console.log(error));
  };


  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Appointment start: {appointment.startTimeString}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Grid container justify="space-around">
          <Typography>
            Doctor: {appointment.doctorId}
          </Typography>
          <Typography>
            Patient: {appointment.patientId}
          </Typography>
          <Typography>
            Type: {appointment.type}
          </Typography>
          <Typography>
            Room: {selectedRoom}
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            View rooms
          </Button>
          <SimpleDialog selectedRoom={selectedRoom} open={open} onClose={handleClose} rooms={rooms}/>
          <Button 
            variant="contained"
            color="primary"
            onClick={confirmRequest}
            >
            Submit
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => {cancelRequest(false);}}
            >
            Cancel
          </Button>
        </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>

        {appointment.changeDate ?   
            <React.Fragment>
  
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <Typography>
                    Date limit: {appointment.changeDate.toLocaleString()}
                  </Typography>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    minDate={new Date(Date.now()+3600000)}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    ampm={false}
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </React.Fragment>
             
          : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
