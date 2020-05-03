import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles((theme) => ({
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
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  }
}));

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);

  return (
    <div>
      <Card 
        className={classes.root}
        // onClick={handlePopoverOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
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
      </Card>
      <Popover
        className={classes.popover}
        classes={{paper:classes.paper}}
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Room: {appointment.room}</Typography>
        <Typography>Appointment type: {appointment.type}</Typography>
        {/* <Typography>Room: {appointment.room}</Typography> */}
      </Popover>
    </div>

  );
}