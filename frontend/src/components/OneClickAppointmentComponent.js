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

export default function OneClickAppointmentComponent() {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now() + 86400000));
  const [doctors, setDoctors] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  
  React.useEffect(() => {
    let clinicId = 1;
    axios.get('http://localhost:8080/api/clinics/doctors?clinicId=' + clinicId)
      .then(res => {
        setDoctors(res.data);
        axios.get('http://localhost:8080/api/clinics/appTypes?clinicId=' + clinicId)
        .then(res => {
          setTypes(res.data);
        })
      })
      .catch(error => console.log(error));
    

  });

  const closeAndSendData = () => {
    var duration = parseInt(document.getElementById('Duration').value);
    var type = document.getElementById("Type").value;
    var room = document.getElementById('Room').value;
    var price = parseInt(document.getElementById('Price').value);
    var doctorId = document.getElementById('Doctor').value;

    var newAppointment = {'clinicId':1,duration,type,room,doctorId,price,'startTime':selectedDate.getTime()}
    console.log(newAppointment);

    if (isNaN(duration) === "" || type === "" || doctorId ==="" || room ==="" || isNaN(price) || isNaN(selectedDate.getTime())) {
      alert("All fields are required!");
    } else {
      axios.post('http://localhost:8080/api/clinics/addFastApt', newAppointment)
        .then((res) => {
          console.log(res);
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
        {['Duration', 'Room', 'Price'].map((field) => 
            <TextField
              required
              key={field}
              id={field}
              label={field}
              defaultValue=""
              variant="filled"
          />
        )}
        <TextField
          id="Type"
          select
          SelectProps={{
            native: true,
          }}
          helperText="Select doctor"
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
