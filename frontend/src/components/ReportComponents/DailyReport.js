import React from 'react'
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Chart from './Chart';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


export default function DailyReport() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [data, setData] = React.useState([]);


  React.useEffect(() => {
    selectedDate.setHours(0);
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    var endDate = new Date(selectedDate.getTime());
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    axios.get('http://localhost:8080/api/clinics/reports?clinicId=1&report=daily&startDate=' + selectedDate.toISOString() + '&endDate=' + endDate.toISOString())
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.log(error));
  }, [selectedDate]);


  return (
    <div>
      <h3>Daily report shows number of appointments for your clinic per day for next 7 days of selected date</h3>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='flex-start'>
          <DatePicker
            label="Select date"
            value={selectedDate}
            onChange={setSelectedDate}
            animateYearScrolling
          />
        </Grid>

      </MuiPickersUtilsProvider>
      <Chart data={data}/>

    </div>
  )
}
