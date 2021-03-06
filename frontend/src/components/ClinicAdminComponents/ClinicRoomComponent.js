import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Component for managing clinic rooms
export default function ClinicRoomComponent() {
  const [rooms, setRooms] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  var cookies = new Cookies();

  React.useEffect(() => {
    let clinicId = 1;
    axios.get("http://localhost:8080/api/clinics/rooms?clinicId=" + clinicId, {withCredentials: true})
    .then(res => {
      setRooms(res.data);
    })
    .catch(error => {console.log(error)});
    // eslint-disable-next-line
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const closeAndSendData = () => {
    handleClose();
    var room = document.getElementById('roomName').value;
  
    var newRoom = {clinicId:cookies.get('clinicId'),room}
    if (room === "") {
      alert("Must enter name for new name!");
    } else if (room.substring(0,4) !== 'Sala') {
      alert('Room name must start with \'Sala\' and follow with a number!');
    } else {
      axios.post('http://localhost:8080/api/clinics/newRoom', newRoom, {withCredentials: true})
        .then((res) => {
          if (res.data !== '') {
            let newRooms = rooms;
            newRooms.push(res.data);
            console.log(res.data)
            setRooms(newRooms);
          } else {
            alert('Room with name \'' + room + '\' already exists!');
          }
        })
        .catch(error => console.log(error));
    }
  
  };
  
  const deleteRoom = (name) => {
    axios.delete('http://localhost:8080/api/clinics/deleteRoom?clinicId=' + cookies.get('clinicId') + "&room=" + name, {withCredentials: true})
      .then(res => {
        if(res.data) {
          let types = rooms.filter(room => room.roomName !== name);
          setRooms(types);
          alert('Room ' + name + ' successfully deleted!');
        } else {
          alert('Room can\'t be deleted!');
        }
      })
      .catch(error => console.log(error));
  }

  return (

    <div>
      <List>
          Rooms:
          {rooms.map((room, index) => 
              <ListItem key={index}>
                <ListItemText
                  primary={room.roomName}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => {deleteRoom(room.roomName)}}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          )}
            
          <Button
          aria-describedby={id} 
          variant="contained"
          color="secondary" 
          onClick={handleClick}
          startIcon={<AddIcon />}
          >
          Add room
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <TextField
              required
              key="room"
              id="roomName"
              label="New clinic room"
              defaultValue=""
              variant="filled"
            />
            <Button 
              variant="contained"
              color="primary"
              onClick={closeAndSendData}
              >
              Submit
            </Button>
          </Grid>
        </Popover>
      </List>
    </div>
  )
}
