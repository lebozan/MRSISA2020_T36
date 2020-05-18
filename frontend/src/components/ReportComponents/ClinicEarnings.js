import React from 'react'
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';


export default function ClinicEarnings() {
  const [data,setData] = React.useState({});
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());


  const sendDataRequest = () => {
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    if (startDate > endDate) {
      alert('Start date cannot be higher than end date!');
      return;
    }
    axios.get('http://localhost:8080/api/clinics/reports?clinicId=1&report=earnings&startDate=' + startDate.toISOString() + '&endDate=' + endDate.toISOString())
      .then(res => {
        setData(res.data[0]);
      })
      .catch(error => console.log(error));

  }

  return (
    <div>
      <br></br>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='space-around'>
          <DatePicker
            label="Select start date"
            value={startDate}
            onChange={setStartDate}
            animateYearScrolling
          />
          <DatePicker
            label="Select end date"
            value={endDate}
            onChange={setEndDate}
            animateYearScrolling
          />
          <Button variant='contained' onClick={sendDataRequest}>test</Button>
        </Grid>

      </MuiPickersUtilsProvider>

      <h3>Clinic earnings between {data.startDate} and {data.endDate} are: {data.earnings} dinara</h3>

    </div>
  )
}
