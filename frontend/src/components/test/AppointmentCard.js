import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles({
  root: {
    minWidth: 20,
    minHeight: 20,
    backgroundColor: '#58D3F7',
    borderWidth:2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AppointmentCard(props) {
  const {appointment} = props;
  const classes = useStyles();
  var weekday=new Array(7);
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {appointment.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          start: {appointment.startDate.getHours() + ':' + appointment.startDate.getMinutes()}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          end: {appointment.endDate.getHours() + ':' + appointment.endDate.getMinutes()}
        </Typography>


      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}