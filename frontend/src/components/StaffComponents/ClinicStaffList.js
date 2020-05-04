import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItemCustom from '../ListItemCustom';
import axios from 'axios'
import AddNurseComponent from './AddNurseComponent';
import AddDoctorComponent from './AddDoctorComponent';

export class ClinicStaffList extends Component {

  constructor(props) {
    super(props);

    this.state = {doctors: [], nurses: []};
  }
  componentDidMount() {
    axios.get("http://localhost:8080/api/doctors/all")
      .then(res => {
        let nurses = this.state.nurses;
        this.setState({doctors: res.data, nurses})})
      .catch(res => {alert(res.status)});

    axios.get("http://localhost:8080/api/nurses/all")
    .then(res => {
      let doctors = this.state.doctors;
      this.setState({doctors, nurses: res.data})})
    .catch(res => {alert(res.status)});
  }

  deleteDoctor(id) {
    axios.delete('http://localhost:8080/api/doctors/delete?doctorId=' + id)
      .then(res => {
        if(res.data) {
          let doctors = this.state.doctors.filter(user => user.id !== id);
          let nurses = this.state.nurses;
          this.setState({doctors, nurses});
        }
      })
      .catch(res => console.log(res));
    
  }

  deleteNurse(id) {
    axios.delete('http://localhost:8080/api/nurses/delete?nurseId=' + id)
    .then(res => {
      if (res.data) {
        let doctors = this.state.doctors;
        let nurses = this.state.nurses.filter(user => user.id !== id);
        this.setState({doctors, nurses});
      }
    })
    .catch(res => console.log(res));

  }

  addDoctor(newDoctor) {
    axios.post('http://localhost:8080/api/doctors/add', newDoctor)
    .then(res => {
      let doctors = this.state.doctors;
      let nurses = this.state.nurses;
      doctors.push(res.data);
      this.setState({doctors, nurses});
    })
    .catch(res => console.log(res));
  }

  addNurse(newNurse) {
    let doctors = this.state.doctors;
    let nurses = this.state.nurses;
    axios.post('http://localhost:8080/api/nurses/add', newNurse)
    .then(res => {
      nurses.push(res.data);
      this.setState({doctors, nurses});
    })
    .catch(res => console.log(res));
    
  }
      
  render() {
    return (
      <div>
        <List>
          Doctors:
          {this.state.doctors.map((doctor, index) => 
          <ListItemCustom key={index} user={doctor} deleteUser={this.deleteDoctor.bind(this, doctor.id)}/> )}
          <AddDoctorComponent  fields={['First Name', 'Last Name', 'Age', 'Address', 'Years Of Experience']} addDoctor={this.addDoctor.bind(this)} />

          Nurses:
          {this.state.nurses.map((nurse, index) => 
          <ListItemCustom key={index} user={nurse} deleteUser={this.deleteNurse.bind(this, nurse.id)}/> )}
          <AddNurseComponent fields={['First Name', 'Last Name', 'Age', 'Address', 'Years Of Experience']} addNurse={this.addNurse.bind(this)}/>
        </List>
      </div>
    )
  }
}

export default ClinicStaffList
