import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import NewPriceListRow from './NewPriceListRow';
import Cookies from 'universal-cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
  dialogPaper: {
    minWidth: '30vw',
    maxHeight: '80vh',
    maxWidth: '80vw',
  },
  root: {
    width: '200px',
  }
});


// Component for creating a new price list for current clinic 
export default function NewPriceList(props) {
  const classes = useStyles();
  const {addNewPriceList} = props;
  const [appointmentTypes, setAppointmentTypes] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const cookies = new Cookies();
  const [newPrices, setNewPrices] = React.useState({})
  const [priceListName, setPriceListName] = React.useState('');


  React.useEffect(() => {
    if (appointmentTypes.length === 0) {
      axios.get("http://localhost:8080/api/clinics/appTypes?clinicId=" + cookies.get('clinicId'))
      .then(res => {
        setAppointmentTypes(res.data);
      })
      .catch(error => console.log(error));
    }
      // eslint-disable-next-line
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPrices = (appointmentType, newPrice) => {
    newPrices[appointmentType] = parseFloat(newPrice);
    setNewPrices(newPrices);
  };

  const submitNewPriceList = () => {
    var data = {
      priceListName,
      prices: newPrices,
      clinicId:cookies.get('clinicId'),
    };

    if (Object.keys(newPrices).length !== appointmentTypes.length || priceListName === '') {
      alert('Must set price list name and price for all appointment types!');
      return;
    }
    addNewPriceList(data);
    handleClose();

  };

  return (
    <div>
      
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new price list
      </Button>
      <Dialog classes={{paper:classes.dialogPaper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New price list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set price for each appointment type

          </DialogContentText>
          <TextField
            fullWidth
            key='new-price-list-name'
            value={priceListName}
            label='Enter name for new price list'
            onChange={(e) => {setPriceListName(e.target.value)}}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Appointment type </TableCell>
                <TableCell> Price </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentTypes.map((appType) => (
                <NewPriceListRow key={'new row ' + appType} appointmentType={appType} createPrices={createPrices}/>
              ))} 
            </TableBody>
          </Table>

        </DialogContent>
        <DialogActions>
          <Button onClick={submitNewPriceList} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
