import React from 'react'
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Chart from './Chart';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Cookies from 'universal-cookie';


export default function WeeklyReport() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [data, setData] = React.useState([]);
  const cookies = new Cookies();


  React.useEffect(() => {
    selectedDate.setDate(1);
    selectedDate.setHours(0);
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);

    var endDate = new Date(selectedDate.getTime());
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    axios.get('http://localhost:8080/api/clinics/reports?clinicId=' + cookies.get('clinicId') + '&report=weekly&startDate=' + selectedDate.toISOString() + '&endDate=' + endDate.toISOString(), {withCredentials: true})
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.log(error));
  }, [selectedDate]);


  return (
    <div>
      <h3>Weekly report shows number of appointments for your clinic per week for selected month</h3>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='flex-start'>
          <DatePicker
            views={["year", "month"]}
            label="Select date"
            minDate={new Date("2019-01-01")}
            maxDate={new Date("2020-12-01")}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </Grid>

      </MuiPickersUtilsProvider>
      <Chart data={data}/>
    </div>
  )
}
