import React from 'react'
import 'date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import Cookies from 'universal-cookie';


export default function OneClickAppointmentComponent() {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now() + 86400000));
  const [doctors, setDoctors] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const cookies = new Cookies();
  
  React.useEffect(() => {
    axios.get('http://localhost:8080/api/clinics/doctors?clinicId=' + cookies.get('clinicId'), {withCredentials: true})
      .then(res => {
        setDoctors(res.data);
      })
      .catch(error => console.log(error));

    axios.get('http://localhost:8080/api/clinics/appTypes?clinicId=' + cookies.get('clinicId'), {withCredentials: true})
      .then(res => {
        setTypes(res.data);
      })
      .catch(error => console.log(error));

      axios.get('http://localhost:8080/api/clinics/rooms?clinicId=' + cookies.get('clinicId'), {withCredentials: true})
      .then(res => {
        setRooms(res.data);
      })
      .catch(error => console.log(error));

  }, []);

  const closeAndSendData = () => {
    var type = document.getElementById("Type").value;
    var room = document.getElementById('Rooms').value;
    var doctorId = document.getElementById('Doctor').value;

    var newAppointment = {'clinicId':cookies.get('clinicId'),
      type,
      room,
      duration:30,
      doctorId,
      'startTime':selectedDate.getTime()
    }

    if ( type === "" || doctorId ==="" || room ==="" || isNaN(selectedDate.getTime())) {
      alert("All fields are required!");
    } else {
      axios.post('http://localhost:8080/api/clinics/addFastApt', newAppointment, {withCredentials: true})
        .then((res) => {
          if (res.data) {
            alert('One click appointment successfully submited!');
          }
        })
        .catch(error => console.log(error));
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
      <h1>
        New One-Click Appointment
      </h1>
      
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
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
      <Grid container justify="space-around">
      <TextField
          id="Rooms"
          select
          SelectProps={{
            native: true,
          }}
          helperText="Select room"
        >
          <option selected disabled key={"disabled"} value="">
              Select room
            </option>
          {rooms.map((room) => (
            <option key={room.roomName} value={room.roomName}>
              {room.roomName}
            </option>
          ))}
        </TextField>
        <TextField
          id="Type"
          select
          SelectProps={{
            native: true,
          }}
          helperText="Select type"
        >
          <option selected disabled key={"disabled"} value="">
              Select type
            </option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </TextField>
        <TextField
          id="Doctor"
          select
          SelectProps={{
            native: true,
          }}
          helperText="Select doctor"
        >
          <option selected disabled key={"disabled"} value="">
              Select doctor
            </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.firstName + " " + doctor.lastName + ", " + doctor.specialty}
            </option>
          ))}
        </TextField>
        <Button 
          variant="contained"
          color="primary"
          onClick={closeAndSendData}
          >
          Submit
        </Button>
      </Grid>
    </div>
  )
}
