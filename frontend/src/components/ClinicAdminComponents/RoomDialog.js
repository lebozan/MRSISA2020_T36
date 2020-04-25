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
import Popover from '@material-ui/core/Popover';


export default function RoomDialog(props) {

  const { onClose, selectedRoom, open, rooms, appointmentDate, index } = props;
  const [shownRooms, setShownRooms] = React.useState([]);


  React.useEffect(() => {
    var rs = checkRoomAvailability(rooms);
    // console.log(rs);
    setShownRooms(rs);
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


  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Choose a room for appointment</DialogTitle>
        <Grid container direction='row' justify='space-around'>
          <TextField 
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
                {/* <Button>
                  dugme
                </Button> */}
              </ListItem>
              </Grid>
            
          ))}

        </List>
        
      </Dialog>
    </div>
  )
}

