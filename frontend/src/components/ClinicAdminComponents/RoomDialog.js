import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField } from '@material-ui/core';
import matchSorter from 'match-sorter';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList'
import Scheduler from '../test/Scheduler';
import { makeStyles } from '@material-ui/core/styles';
import ScrollContainer from 'react-indiana-drag-scroll'



const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vw',
    maxWidth: '80vw'
},
root: {
  width: '200px',
}
});


export default function RoomDialog(props) {
  const classes = useStyles();
  const { onClose, selectedRoom, open, rooms, appointmentDate, index } = props;
  const [shownRooms, setShownRooms] = React.useState([]);
  const [showRoomRes, setShowRoomRes] = React.useState('');


  React.useEffect(() => {
    var rs = checkRoomAvailability(rooms);
    // console.log(rs);
    setShownRooms(rs);
      // eslint-disable-next-line
  }, [rooms]);



  const handleClose = () => {
    // setAnchorEl(null);
    onClose(selectedRoom);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const checkRoomAvailability = () => {
    var roomList = [];
    var appDate = new Date(appointmentDate);
    let lesser = new Date(appDate.getTime() - 1800000);
    let greater = new Date(appDate.getTime() + 1800000);

    rooms.forEach(room => {
      var dateCheck = false;
      var datesOccupied = room.reservations;
      // console.log(datesOccupied);
      datesOccupied.forEach(date => {
        let reservation = new Date(date);
        if (reservation > lesser && reservation < greater) {
          dateCheck = true;
        }
      });
      if (!dateCheck) {
        roomList.push(room);
      }
    });
    return roomList;
  };

  const roomSearch = () => {
    var searchValue = document.getElementById('search').value;
    if (searchValue === '') {
      setShownRooms(rooms);
    } else {
      var newShownRooms = shownRooms;
      newShownRooms = matchSorter(newShownRooms, searchValue, {keys:['roomName']});
      // console.log(newShownRooms);
      setShownRooms(newShownRooms);
    }

  }

  const returnRoomReservations = (room, index) => {
    if (showRoomRes === room.roomName) {
      return <Scheduler key={index} roomName={room.roomName} reservations={room.reservations}/>
    }
    
  }

  const roomReservations = (room) => {
    setShowRoomRes(room);
  };

  return (
    <div>
      <ScrollContainer>
        
      </ScrollContainer>
      <Dialog classes={{paper:classes.dialogPaper}} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Choose a room for appointment</DialogTitle>
        <ScrollContainer className="scroll-container" hideScrollbars={false}>
          <Grid container direction='row' justify='space-around'>
            <TextField 
              style={{width:'70%'}}
              key='search' 
              id='search'
              defaultValue='' 
              label='Search'
              autoComplete='off'
              onChange={roomSearch}
            >
            </TextField>
            <Button>
              <FilterIcon />
              Filter
            </Button>
          </Grid>
            <List>
              {shownRooms.map((room) => (


                <Grid key={index + room.roomName} container direction='row' justify='space-around'>
                  <ListItem button onClick={() => {handleListItemClick(room.roomName)}} key={room.roomName} >
                    <ListItemText primary={room.roomName} />
                  </ListItem>
                  <ListItem button onClick={() => {roomReservations(room.roomName)}}>
                    {room.roomName} reservations
                  </ListItem>
                  
                </Grid>
                
              ))}

            </List>
            {shownRooms.map((room, index) => (
              returnRoomReservations(room, index)
              
            ))}
        </ScrollContainer>
        
        
        
        
      </Dialog>
    </div>
  )
}

