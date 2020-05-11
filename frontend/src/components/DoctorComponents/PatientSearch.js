import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import PatientList from './PatientList';
import matchSorter from 'match-sorter'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PatientPage from './PatientPage';


const headerData = [
  'First Name', 'Last Name', 'Unique Patient Number'
]

export class PatientSearch extends Component {
  constructor() {
    super();

    this.state = {
      patients:[],
      shownPatients:[],
      sortReverse: false,
      lastRowSorted: 'First Name',
      selectedPatient: {},
      cookies:new Cookies(),

    }
  }

  componentDidMount() {
    if (this.state.patients.length === 0) {
      axios.get('http://localhost:8080/api/patients/getAllFromClinic?clinicId=1')
      .then((res) => {
        var patients = this.checkWhichMedicalRecordToShow(res.data);
        
        this.setState({patients,
        shownPatients:patients.sort((patientA, patientB) => {return patientA.firstName.localeCompare(patientB.firstName)})});
      })
      .catch(error => console.log(error));
    }

  }

  checkWhichMedicalRecordToShow(patients) {
    var doctorId = this.state.cookies.get('doctorId');

    patients.forEach(patient => {
      patient.showMR = false;
      patient.medicalRecord.finishedAppointments.forEach(app => {
        if (patient.showMR) {
          return;
        } else {
          if (app.doctorId === doctorId) {
            patient.showMR = true;
          }
        }

      })
    })

    return patients;
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

  selectPatient(patient) {
    this.setState({...this.state,selectedPatient:patient});
  }

  render() {
    var patient = this.state.selectedPatient;
    return (
      <div>
        <TextField 
          fullWidth
          type='search'
          label='Search patients'
          onChange={(e) => {this.showSearchResults(e.target.value)}}
        />
        <br/>
        {Object.keys(patient).length > 0 ? <PatientPage patient={patient} /> : null}
        <br/>
        <Paper>
          <TableContainer style={{maxHeight: 550}}>
            <Table stickyHeader aria-label="simple table">
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
                <PatientList rows={this.state.shownPatients} selectPatient={this.selectPatient.bind(this)}/>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        
      </div>
    )
  }
}

export default PatientSearch
