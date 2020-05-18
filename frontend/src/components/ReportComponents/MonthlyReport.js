import React from 'react'
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Chart from './Chart';


export default function MonthlyReport() {
  const [data,setData] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // React.useEffect(() => {

  // }, []);

  const sendDataRequest = () => {
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    axios.get('http://localhost:8080/api/clinics/reports?clinicId=1&report=monthly&startDate=' + startDate.toISOString() + '&endDate=' + endDate.toISOString())
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.log(error));

  }


  return (
    <div>
      <h3>Monthly report shows number of appointments per month in selected month range</h3>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='space-around'>
          <DatePicker
            views={["year", "month"]}
            label="Select start date"
            minDate={new Date("2019-01-01")}
            maxDate={new Date("2020-12-31")}
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            views={["year", "month"]}
            label="Select end date"
            minDate={new Date("2019-01-01")}
            maxDate={new Date("2020-12-31")}
            value={endDate}
            onChange={setEndDate}
          />
          <Button variant='contained' onClick={sendDataRequest}>test</Button>
        </Grid>

      </MuiPickersUtilsProvider>

      <Chart data={data}/>
    </div>
  )
}
