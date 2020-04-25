import React from 'react';
import AppointmentRequestRow from './AppointmentRequestRow';
import axios from 'axios';




export default function RequestedAppointmentsComponent() {

  const [requests, setRequests] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(()=> {
    let clinicAdminId = "ca1";
    axios.get('http://localhost:8080/api/clinicAdmins/allUAs?clinicAdminId=' + clinicAdminId)
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

    axios.get("http://localhost:8080/api/clinics/rooms?clinicId=1")
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
        <AppointmentRequestRow key={index} index={index} appointment={request} rooms={rooms} removeRequest={() => {removeRequest(request.id)}}/>
      ))}
      
    </div>
  )
}
