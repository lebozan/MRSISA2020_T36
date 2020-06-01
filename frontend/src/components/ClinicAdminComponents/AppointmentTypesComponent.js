import React from 'react'
import List from '@material-ui/core/List';
import axios from 'axios'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'universal-cookie';

// Component for managing clinic's appointment types
export default function AppointmentTypesComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [appTypes, setAppTypes] = React.useState([]);
  const [appTypeName, setAppTypeName] = React.useState('');
  const [appTypePrice, setAppTypePrice] = React.useState(0);
  const cookies = new Cookies();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  React.useEffect(() => {
    axios.get("http://localhost:8080/api/clinics/appTypes?clinicId=" + cookies.get('clinicId'), {withCredentials: true})
    .then(res => {
      setAppTypes(res.data);
    })
    .catch(res => {console.log(res)});
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const closeAndSendData = () => {
    handleClose();
  
    var newAppType = {clinicId:1,appTypeName, appTypePrice}
    if (appTypeName === "") {
      alert("Must enter name for new appointment type!");
      return;
    } if (appTypePrice === 0) {
      alert('Price must be number bigger then 0!');
      return;
    } else {
      addAppType(newAppType);
    }
  };
  
  const deleteAppType = (name) => {
    let clinicId = 1;
    axios.delete('http://localhost:8080/api/clinics/deleteAppType?clinicId=' + clinicId + "&appType=" + name, {withCredentials: true})
      .then(res => {
        if(res.data) {
          let types = appTypes.filter(appType => appType !== name);
          setAppTypes(types);
        }
      })
      .catch(res => console.log(res));
  }
  
  const addAppType = (newAppType) => {
    axios.post('http://localhost:8080/api/clinics/addAppType', newAppType, {withCredentials: true})
    .then(res => {
      if (res.data) {
        setAppTypes(appTypes => [...appTypes, newAppType.appTypeName]);
      }
    })
    .catch(res => console.log(res));
  }

  return (
    <div>
      <List>
          Appointment Types:
          {appTypes.map((appType, index) => 
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={appType}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => {deleteAppType(appType)}}>
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
            Add appointment type
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
              key="appType"
              id="appTypeName"
              label="New Appointment type"
              value={appTypeName}
              onChange={(e) => {setAppTypeName(e.target.value)}}
              variant="filled"
            />
            <TextField
              required
              key="price"
              id="appTypePrice"
              label="New Appointment type price"
              value={appTypePrice}
              onChange={(e) => {setAppTypePrice(e.target.value)}}
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

