import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PatientSearchHead from './PatientSearchHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PatientList from './PatientList';
import matchSorter from 'match-sorter'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const headerData = [
  'First Name', 'Last Name', 'Address', 'Age', 'City', 'Unique Patient Number'
]

export class PatientSearch extends Component {
  constructor() {
    super();

    this.state = {
      patients:[],
      shownPatients:[],
      sortReverse: false,
      lastRowSorted: 'First Name',

    }
  }

  componentDidMount() {
    if (this.state.patients.length === 0) {
      axios.get('http://localhost:8080/api/patients/all')
      .then((res) => {
        this.setState({patients:res.data,
        shownPatients:res.data.sort((patientA, patientB) => {return patientA.firstName.localeCompare(patientB.firstName)})});
      })
      .catch(error => console.log(error));
    }

  }
  
  showSortedRowHeader(rowName) {
    if (this.state.lastRowSorted === rowName) {
      if (this.state.sortReverse) {
        return (
          <ArrowDownwardIcon />
        )
      } else {
        return (
          <ArrowUpwardIcon />
        )
      }
    }
  }
  
  showSearchResults(searchQuery) {
    var shownPatients = matchSorter(this.state.patients, searchQuery, {keys:['firstName', 'lastName', 'address', 'age', 'city', 'uniquePatientNumber']});
    var row = this.state.lastRowSorted[0].toLowerCase() + this.state.lastRowSorted.slice(1,);
    row = row.replace(/\s/g,'');
    if (row === 'age' || row === 'uniquePatientNumber') {
      shownPatients.sort((patientA, patientB) => {return patientA[row] > patientB[row]});
    } else {
      shownPatients.sort((patientA, patientB) => {return patientA[row].localeCompare(patientB[row])})
    }
    
    
    if (this.state.sortReverse) {
      shownPatients.reverse();
    }

    this.setState({shownPatients});
  }

  sortTable(rowName) {
    var row = rowName[0].toLowerCase() + rowName.slice(1,);
    row = row.replace(/\s/g,'');
    var shownPatients = this.state.shownPatients;
    var sortReverse = false;

    if (rowName === this.state.lastRowSorted) {
      sortReverse = !this.state.sortReverse;
    }
    
    if (row === 'age' || row === 'uniquePatientNumber') {
      shownPatients.sort((patientA, patientB) => {return patientA[row] > patientB[row]});
    } else {
      shownPatients.sort((patientA, patientB) => {return patientA[row].localeCompare(patientB[row])})
    }

    if (sortReverse) {
      shownPatients.reverse();
    }
    
    this.setState({patients: this.state.patients, shownPatients, sortReverse, lastRowSorted:rowName})
  }

  render() {
    return (
      <div>
        <TextField 
          fullWidth
          type='search'
          label='Search patients'
          onChange={(e) => {this.showSearchResults(e.target.value)}}
        />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerData.map((header) => (
                <TableCell align="left" key={header} onClick={() => {this.sortTable(header)}}>
                  {header}
                  {this.showSortedRowHeader(header)}
                </TableCell>
              ))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            <PatientList rows={this.state.shownPatients} />
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default PatientSearch
