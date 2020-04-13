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

export default function AppointmentTypesComponent() {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [appTypes, setAppTypes] = React.useState([]);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  React.useEffect(() => {
    let clinicId = 1;
    axios.get("http://localhost:8080/api/clinics/appTypes?clinicId=" + clinicId)
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
    var appType = document.getElementById('appTypeName').value;
  
    var newAppType = {clinicId:1,appType}
    if (appType === "") {
      alert("Must enter name for new appointment type!");
    } else {
      addAppType(newAppType);
    }
  
  };
  
  const deleteAppType = (name) => {
    let clinicId = 1;
    axios.delete('http://localhost:8080/api/clinics/deleteAppType?clinicId=' + clinicId + "&appType=" + name)
      .then(res => {
        if(res.data) {
          let types = appTypes.filter(appType => appType !== name);
          setAppTypes(types);
          
        }
      })
      .catch(res => console.log(res));
  }
  
  const addAppType = (newAppType) => {
    axios.post('http://localhost:8080/api/clinics/addAppType', newAppType)
    .then(res => {
      if (res.data) {

        setAppTypes(appTypes => [...appTypes, newAppType.appType]);
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
              label="New Appointment Type"
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

