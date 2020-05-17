import React from 'react'
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Cookies from 'universal-cookie';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function LeaveRequest() {
  const [leaveDaysLeft, setLeaveDaysLeft] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [leaveDaysRequested, setLeaveDaysRequested] = React.useState(0);
  const cookies = new Cookies();
  cookies.set('doctorId', 'd1', {path:'/'});

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/doctors/leaveDaysLeft?doctorId=' + cookies.get('doctorId'))
      .then(res => {
        if (res.data !== -1) {
          setLeaveDaysLeft(res.data);
        }
      })
      // eslint-disable-next-line
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const sendLeaveRequest = () => {
    var requestedDays = parseInt(leaveDaysRequested);
    if (isNaN(requestedDays)) {
      alert('Number of requested days must be integer!');
      return;
    }

    if (requestedDays === 0) {
      alert('Number of requested days must be higher than 0!');
      return;
    }

    if (leaveDaysLeft < requestedDays) {
      alert('Requested days (' + requestedDays + ') cannot be greated than leave days you have (' + leaveDaysLeft + ')!');
      return;
    }
    var leaveStartDate = new Date(selectedDate.getTime());
    leaveStartDate.setHours(0);
    leaveStartDate.setSeconds(0);
    leaveStartDate.setMinutes(0);

    var leaveEndDateTime = leaveStartDate.getTime();
    var leaveEndDate = new Date(leaveEndDateTime);
    var index = 0;
    while (index < requestedDays - 1) {
      if (leaveEndDate.getDay() === 6) {
        leaveEndDate.setDate(leaveEndDate.getDate() + 2);
      } else {
        leaveEndDate.setDate(leaveEndDate.getDate() + 1);
        index++;
      }
    }
    if (leaveEndDate.getDay() === 6) {
      leaveEndDate.setDate(leaveEndDate.getDate() + 2);
    } else if (leaveEndDate.getDay() === 0) {
      leaveEndDate.setDate(leaveEndDate.getDate() + 1);
    }

    leaveEndDate.setHours(23);
    leaveEndDate.setMinutes(59);
    leaveEndDate.setSeconds(59);
    
    var data = {
      leaveStartDate: leaveStartDate.getTime(),
      leaveEndDate: leaveEndDate.getTime(),
      staffId:cookies.get('doctorId'),
      clinicId:cookies.get('clinicId'),
      leaveDuration: requestedDays,
    }

    var updateLeaveDays = {
      leaveDuration: requestedDays,
      doctorId:cookies.get('doctorId'),
    }

    axios.post('http://localhost:8080/api/clinicAdmins/newLeaveRequest', data)
      .then(res => {
        if (res.data) {
          alert('Leave request submited!');

          axios.put('http://localhost:8080/api/doctors/updateLeaveDays', updateLeaveDays)
            .then(res => {
              setLeaveDaysLeft(res.data);
              setLeaveDaysRequested(0);
            })
            .catch(error => console.log(error));
        } else {
          alert('Leave request not submited!');
        }
      })
      .catch(error => console.log(error));
  };


  return (
    <div>
      <Grid container justify='space-around'>
        <Typography>
          Leave days you have left: {leaveDaysLeft}
        </Typography>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker"
            label="Select leave start date"
            format="dd/MM/yyyy"
            minDate={new Date(Date.now()+14*86400000)}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          style={{width:'30%'}}
          key='leaveDaysRequested'
          value={leaveDaysRequested}
          label='Enter amount of days you want to request leave for'
          onChange={(e) => {setLeaveDaysRequested(e.target.value)}}
        />
        <Button 
          variant="contained"
          color="primary"
          onClick={sendLeaveRequest}
        >
          Submit
        </Button>
      </Grid>
    </div>
  )
}
