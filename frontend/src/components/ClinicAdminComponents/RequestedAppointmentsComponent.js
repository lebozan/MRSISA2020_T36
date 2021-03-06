import React from 'react';
import AppointmentRequestRow from './AppointmentRequestRow';
import axios from 'axios';
import Cookies from 'universal-cookie'

// Component for rendering all unconfirmed appointment requests for current clinic
export default function RequestedAppointmentsComponent() {
  const [requests, setRequests] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const cookies = new Cookies();

  React.useEffect(()=> {
    axios.get('http://localhost:8080/api/clinicAdmins/allUAs?clinicAdminId=' + cookies.get('clinicAdminId'), {withCredentials: true})
      .then(res => {
        let r = res.data;
        r.forEach((element, index) => {
          let changes = checkDateOverlap(element, r, index);
          changes.forEach(i => {
            r[i].changeDate = new Date(element.startTime);
          })

          element.startTimeString = new Date(element.startTime).toLocaleString();
        });
        setRequests(r);
      })
      .catch(error => console.log(error));

    axios.get("http://localhost:8080/api/clinics/rooms?clinicId=" + cookies.get('clinicId'), {withCredentials: true})
      .then(res => {
        setRooms(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const removeRequest = (id) => {
    let rqs = requests.filter(rq => rq.id !== id);
    setRequests(rqs);
  }

  const checkDateOverlap = (request, reqs, index) => {
    let changes = [];
    for (var i = index + 1; i < reqs.length; i++ ) {
      let date = new Date(request.startTime);
      let lesser = new Date(date.getTime() - 1800000);
      let greater = new Date(date.getTime() + 1800000);
      let d = new Date(reqs[i].startTime);
      if (d > lesser && d < greater) {
        changes.push(i);
      }
    }
    return changes;
  }


  return (
    <div>
      {requests.length===0 ? <h1>No appointment requests</h1> : null}
      {requests.map((request, index) => (
        <AppointmentRequestRow key={request.id + '--' + index} index={index} appointment={request} rooms={rooms} removeRequest={() => {removeRequest(request.id)}}/>
      ))}
    </div>
  )
}
