import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import AppointmentCard from './AppointmentCard'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";



export class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: {monday:[], tuesday:[], wednesday:[],thursday:[],friday:[],saturday:[],sunday:[],empty:true},
      today: new Date(),
      data: props.reservations,
      dates: [],
      roomName: props.roomName,
    }
  }

  getDateDay(date) {
    return date.getDay();
  }
  
  componentDidMount() {
    if (this.state.reservations.empty) {

      var weekStart = new Date();
      weekStart.setHours(0);
      weekStart.setSeconds(0);
      weekStart.setSeconds(0);
      var weekEnd = new Date(weekStart.getTime() + 604800000);
      weekEnd.setHours(23);
      weekEnd.setSeconds(59);
      weekEnd.setSeconds(59);
      var dates = [];
      for (let index = 0; index < 7; index++) {
        var date = new Date(this.state.today.getTime() + index*86400000);
        dates[index] = date;
        
      }


      var reservations = {monday:[], tuesday:[], wednesday:[],thursday:[],friday:[],saturday:[],sunday:[],empty:false};
      this.state.data.forEach(r => {
        var startDate = new Date(r);
        var endDate = new Date(startDate.getTime() + 1800000);
        var title = 'Pregled'
        if (startDate > weekStart && endDate < weekEnd) {
          switch (startDate.getDay()) {
            case 0:
              reservations.sunday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 1:
              reservations.monday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 2:
              reservations.tuesday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 3:
              reservations.wednesday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 4:
              reservations.thursday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 5:
              reservations.friday.push({
                startDate,
                endDate,
                title
              });
              break;
            case 6:
              reservations.saturday.push({
                startDate,
                endDate,
                title
              });
              break;
            default:
              break;
          }
        }
        

      });


      this.setState({reservations, today: new Date(), data: this.state.data, dates, roomName:this.state.roomName});
    }
    
  }

  render() {
    const dates = this.state.dates;
    const res = this.state.reservations;
    const room = this.state.roomName;
    return (
      <div>
        <h3>{room}</h3>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            {dates.map((date) => (
              <TableCell>
                {weekday[date.getDay()]}
                <br/>
                {date.getDate()}
              </TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dates.map((date) => (
              <TableCell>
                <Grid container direction='column'>
                  {this.getDateDay(date)===0 ? 
                    res.sunday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null} 
                  {this.getDateDay(date)===1 ? 
                    res.monday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null} 
                  {this.getDateDay(date)===2 ? 
                    res.tuesday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null}
                  {this.getDateDay(date)===3 ? 
                    res.wednesday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null}
                  {this.getDateDay(date)===4 ? 
                    res.thursday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null}
                  {this.getDateDay(date)===5 ? 
                    res.friday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null}
                  {this.getDateDay(date)===6 ? 
                    res.saturday.map((app) => (
                      <AppointmentCard appointment={app}/>
                    ))
                  : null}

                </Grid>
              </TableCell>
              ))}
            
          </TableBody>
        </Table>

      </div>
    )
  }
}

export default Scheduler

