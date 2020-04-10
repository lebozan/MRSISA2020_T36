import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

export default function AddDoctorComponent(props) {
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const specialties = ["Allergy And Immunology", "Anesthesiology", "Dermatology", "Radiology", "Emergency Medicine", "Internal Medicine",
    "Neurology", "Medical Genetics", "Nuclear Medicine", "Gynecology", "Ophthalmology", "Pathology", "Pediatrics", "Physical Medicine", 
    "Preventive Medicine", "Psychiatry", "Oncology", "Surgery", "Urology"];

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
    var specialty = document.getElementById('Specialty').value;

    var newDoctor = {firstName,lastName,age,address, specialty,yearsOfExperience}
    console.log(newDoctor);

    if (firstName === "" || lastName === "" || isNaN(age) || isNaN(yearsOfExperience) || address === "" || specialty === "") {
      alert("All fields are required!");
    } else {
      props.addDoctor(newDoctor);
    }
    
    
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <Button
          aria-describedby={id} 
          variant="contained"
          color="primary" 
          onClick={handleClick}
          startIcon={<AddIcon />}
          >
          Add doctor
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
            
            <TextField
              id="Specialty"
              select
              SelectProps={{
                native: true,
              }}
              helperText="Select doctor specialty"
            >
              <option selected disabled key={"disabled"} value="">
                  Select specialty
                </option>
              {specialties.map((spec) => (
                <option key={spec} value={spec.replace(/\s/g,'')}>
                  {spec}
                </option>
              ))}
            </TextField>
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
