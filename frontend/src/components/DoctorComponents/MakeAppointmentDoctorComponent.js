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

// Component for doctor to request an appointment for the patient
export default function MakeAppointmentDoctorComponent() {
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now() + 86400000));
  const [types, setTypes] = React.useState([]);
  const cookies = new Cookies();

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/clinics/appTypes?clinicId=' + cookies.get('clinicId'), {withCredentials: true})
    .then(res => {
      setTypes(res.data);
    })
  }, []);


  const handleDateChange = (date) => {
    date.setSeconds(0);
    setSelectedDate(date);
  };

  const closeAndSendData = () => {
    var patientId = parseInt(document.getElementById('patientId').value);
    var type = document.getElementById("Type").value;
    var doctorId = cookies.get("doctorId");
    var clinicId = cookies.get('clinicId');
    
    var newAppointment = {clinicId,patientId,type,doctorId,'startTime':selectedDate.getTime()}

    if (isNaN(patientId) === "" || type === "" || isNaN(selectedDate.getTime())) {
      alert("All fields are required!");
    } else {
      axios.post('http://localhost:8080/api/clinicAdmins/submitUA', newAppointment, {withCredentials: true})
        .then((res) => {
          if (res.data) {
            alert("Appointment succesfully submited");
          }
        })
        .catch(error => console.log(error));
    }
  };


  return (
    <div>
      <h1>
        New Appointment for patient
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
          <TextField
            required
            key="patientId"
            id="patientId"
            label="Patient ID"
            defaultValue=""
            variant="filled"
          />
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
          <Button 
            variant="contained"
            color="primary"
            onClick={closeAndSendData}
            >
            Submit
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
      

    </div>
  )
}
