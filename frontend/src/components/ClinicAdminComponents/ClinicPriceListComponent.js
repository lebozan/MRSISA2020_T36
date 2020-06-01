import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PricesComponent from './PricesComponent';
import NewPriceList from './NewPriceList'; 

// Component for managing clinic price lists
export class ClinicPriceListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceLists: [],
      cookies: new Cookies(),
    };
  }

  // Get all price lists for current clinic
  componentDidMount() {
    axios.get("http://localhost:8080/api/clinics/clinicPriceLists?clinicId=" + this.state.cookies.get('clinicId'), {withCredentials: true})
    .then(res => {
      if (this.state.priceLists.length === 0) {
        this.setState({priceLists:res.data, cookies: this.state.cookies});
      }
    })
    .catch(error => console.log(error));
  }

  deletePriceList(plId) {
    axios.delete('http://localhost:8080/api/clinics/deletePriceList?priceListId=' + plId, {withCredentials: true})
    .then(res => {
      if(res.data) {
        let pls = this.state.priceLists.filter(pl => pl.id !== plId);
        this.setState({priceLists:pls, cookies: this.state.cookies});
        alert('Price list successfully deleted!');
      }
    })
    .catch(error => console.log(error));
  }

  addNewPriceList(data) {
    axios.post('http://localhost:8080/api/clinics/newPriceList', data, {withCredentials: true})
      .then(res => {
        // console.log(res.data);
        var pls = this.state.priceLists;
        pls.push(res.data);
        this.setState({priceLists: pls, cookies:this.state.cookies});
      })
      .catch(error => console.log(error));
  }

  // set a price list to be active
  makePriceListActive(plId, isActive) {
    var data = {
      clinicId: this.state.cookies.get('clinicId'),
      priceListId: plId
    }

    if (isActive) {
      return;
    }

    axios.put('http://localhost:8080/api/clinics/changeActivePriceList', data, {withCredentials: true})
    .then(res => {
      if(res.data !== '') {
        this.setState({priceLists:res.data, cookies: this.state.cookies});
      }
    })
    .catch(error => console.log(error));
  };

  // apply price change to selected clinic
  changeAppointmentTypePrice(priceListId, newPrices) {
    var priceListsChange = this.state.priceLists;
    priceListsChange.forEach(priceList => {
      if (priceList.id === priceListId) {
        priceList.prices = newPrices;
        return;
      } else {
        return;
      }
    });
    this.setState({priceLists:priceListsChange, cookies: this.state.cookies});

  };

  render() {
    var priceLists = this.state.priceLists;
    return (
      <div>
        {priceLists.map((pl, index) => (
          <ExpansionPanel key={pl.id + '-' + index} >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{pl.name}</Typography>
              <Grid container justify='flex-end'>
                <Typography>active:</Typography>
                {pl.active === true ? 
                  <FiberManualRecordIcon style={{color:'green'}}/>
                  :
                  <FiberManualRecordIcon style={{color:'red'}}/>
                }
                
              </Grid>
              
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Appointment type
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <PricesComponent
                    key={pl.id + ' prices list'}
                    prices={pl.prices}
                    priceListId={pl.id}
                    changeAppointmentTypePrice={(newPrices) => {this.changeAppointmentTypePrice(pl.id, newPrices);}}
                  />
                </TableBody>
              </Table>
              <Button 
                  variant="contained"
                  color="primary"
                  onClick={() => {this.makePriceListActive(pl.id, pl.active)}}
                >
                  Make active
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={() => {this.deletePriceList(pl.id)}}
                >
                  Delete
                </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <NewPriceList addNewPriceList={this.addNewPriceList.bind(this)} />
      </div>
    )
  }
}

export default ClinicPriceListComponent
