import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    minWidth: '20vw',
    maxWidth: '20vw'
  }
}));


export default function EditPriceRow(props) {
  const classes = useStyles();
  const {appointmentType, changeItemPrice} = props;
  const [price, setPrice] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;


  const changePriceState = (appointmentType) => {

    var priceCheck = parseFloat(price);

    if (price === 0 || isNaN(priceCheck)) {
      alert('Price must be a number bigger then 0!');
      return;
    }

    changeItemPrice(appointmentType, priceCheck);
    handleClose();

  };


  return (
    <div>
      <Button
        key={appointmentType + ' change price'}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Edit prices
      </Button>
      <Popover
        classes={{paper:classes.paper}}
        key={appointmentType + ' popover'}
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TextField 
            variant='filled'
            fullWidth
            id={appointmentType}
            key={appointmentType}
            label={'Enter new price for ' + appointmentType}
            value={price}
            onChange={(e) => {setPrice(e.target.value)}}
          />
          <Button
            key={appointmentType + 'changePriceBtn'}
            variant="contained"
            color="primary"
            onClick={() => {changePriceState(appointmentType)}}
          >
            Submit
          </Button>
        </Grid>
      </Popover>
    </div>
  )
}
