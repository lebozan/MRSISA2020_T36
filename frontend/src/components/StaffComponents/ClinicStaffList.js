import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItemCustom from '../ListItemCustom';
import axios from 'axios';
import AddNurseComponent from './AddNurseComponent';
import AddDoctorComponent from './AddDoctorComponent';
import Cookies from 'universal-cookie';

export class ClinicStaffList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      nurses: [],
      cookies: new Cookies()
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/api/clinics/doctors?clinicId=" + this.state.cookies.get('clinicId'), {withCredentials: true})
      .then(res => {
        let nurses = this.state.nurses;
        this.setState({doctors: res.data, nurses})})
      .catch(error => {console.log(error)});

    axios.get("http://localhost:8080/api/clinics/nurses?clinicId=" + this.state.cookies.get('clinicId'), {withCredentials: true})
    .then(res => {
      let doctors = this.state.doctors;
      this.setState({doctors, nurses: res.data})})
    .catch(error => {console.log(error)});
  }

  deleteDoctor(id) {
    axios.delete('http://localhost:8080/api/doctors/delete?doctorId=' + id, {withCredentials: true})
      .then(res => {
        if(res.data) {
          let doctors = this.state.doctors.filter(user => user.id !== id);
          let nurses = this.state.nurses;
          this.setState({doctors, nurses});
        }
      })
      .catch(error => {console.log(error)});
    
  }

  deleteNurse(id) {
    axios.delete('http://localhost:8080/api/nurses/delete?nurseId=' + id, {withCredentials: true})
    .then(res => {
      if (res.data) {
        let doctors = this.state.doctors;
        let nurses = this.state.nurses.filter(user => user.id !== id);
        this.setState({doctors, nurses});
      }
    })
    .catch(error => {console.log(error)});

  }

  addDoctor(newDoctor) {
    axios.post('http://localhost:8080/api/clinics/addDoctor?clinicId=' + this.state.cookies.get('clinicId'), newDoctor, {withCredentials: true})
    .then(res => {
      let doctors = this.state.doctors;
      let nurses = this.state.nurses;
      doctors.push(res.data);
      this.setState({doctors, nurses});
    })
    .catch(error => {console.log(error)});
  }

  addNurse(newNurse) {
    let doctors = this.state.doctors;
    let nurses = this.state.nurses;
    axios.post('http://localhost:8080/api/nurses/add', newNurse, {withCredentials: true})
    .then(res => {
      nurses.push(res.data);
      this.setState({doctors, nurses});
    })
    .catch(error => {console.log(error)});
    
  }
      
  render() {
    return (
      <div>
        <List>
          Doctors:
          {this.state.doctors.map((doctor) => 
          <ListItemCustom key={doctor.id} user={doctor} deleteUser={this.deleteDoctor.bind(this, doctor.id)}/> )}
          <AddDoctorComponent fields={['First Name', 'Last Name', 'Age', 'Address', 'Years Of Experience', 'Working Hours']} addDoctor={this.addDoctor.bind(this)} />

          Nurses:
          {this.state.nurses.map((nurse) => 
          <ListItemCustom key={nurse.id} user={nurse} deleteUser={this.deleteNurse.bind(this, nurse.id)}/> )}
          <AddNurseComponent fields={['First Name', 'Last Name', 'Age', 'Address', 'Years Of Experience']} addNurse={this.addNurse.bind(this)}/>
        </List>
      </div>
    )
  }
}

export default ClinicStaffList
