import React from 'react'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

// Component for adding new nurse to the clinic
export default function AddNurseComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeAndSendData = () => {
    handleClose();
    var firstName = document.getElementById('FirstName').value;
    var lastName = document.getElementById("LastName").value;
    var age = parseInt(document.getElementById('Age').value);
    var yearsOfExperience = parseInt(document.getElementById('YearsOfExperience').value);
    var address = document.getElementById('Address').value;

    var newNurse = {firstName,lastName,age,address, yearsOfExperience}
    if (firstName === "" || lastName === "" || isNaN(age) || isNaN(yearsOfExperience) || address === "") {
      alert("All fields are required!");
    } else {
      props.addNurse(newNurse);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <Button
          aria-describedby={id} 
          variant="contained"
          color="secondary" 
          onClick={handleClick}
          startIcon={<AddIcon />}
          >
          Add nurse
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
            {props.fields.map((field) => 
              <React.Fragment>
                <TextField
                  required
                  key={field}
                  id={field.replace(/\s/g,'')}
                  label={field}
                  defaultValue=""
                  variant="filled"
                />
              </React.Fragment>
              )}
            
            <Button 
              variant="contained"
              color="primary"
              onClick={closeAndSendData}
              >
              Submit
            </Button>
          </Grid>
        </Popover>

      
    </div>
  )
}
