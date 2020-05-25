import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import LeaveRequestRow from './LeaveRequestRow';

// Component for managing leave requests from clinic staff
export default function ManageLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = React.useState([]);
  const cookies = new Cookies();

  React.useEffect(() => {
    if (leaveRequests.length === 0) {
      axios.get('http://localhost:8080/api/clinicAdmins/allLeaveRequests?clinicAdminId=' + cookies.get('clinicAdminId'))
        .then(res => {
          setLeaveRequests(res.data);
        })
        .catch(error => console.log(error));
    }
    // eslint-disable-next-line
  }, []);


  const removeRequest = (requestId) => {
    let leaveRqs = leaveRequests.filter(rq => rq.id !== requestId);
    setLeaveRequests(leaveRqs);
  }

  const acceptLeaveRequest = (newLeave, id) => {
    newLeave['clinicId'] = cookies.get('clinicId');
    axios.post('http://localhost:8080/api/clinics/confirmLeaveRequest', newLeave)
      .then(res => {
        if (res.data) {
          axios.delete('http://localhost:8080/api/clinicAdmins/deleteLeaveRequest?leaveId=' + id + '&clinicAdminId=' + cookies.get('clinicAdminId'))
            .then(res => {
              if (res.data) {
                removeRequest(id);
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

  const rejectLeaveRequest = (data, id) => {
    axios.post('http://localhost:8080/api/clinics/rejectLeaveRequest', data)
      .then(res => {
        if (res.data) {
          axios.delete('http://localhost:8080/api/clinicAdmins/deleteLeaveRequest?leaveId=' + id + '&clinicAdminId=' + cookies.get('clinicAdminId'))
            .then(res => {
              if (res.data) {
                removeRequest(id);
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      {leaveRequests.map(request => (
        <LeaveRequestRow key={request.id} request={request} sendAccept={acceptLeaveRequest} sendReject={rejectLeaveRequest}/>
      ))}
    </div>
  )
}
