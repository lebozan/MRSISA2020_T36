import React from 'react'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


export default function PatientMedicalRecord(props) {
  const {pastAppointments} = props;


  return (
    <div>
      <Typography>Patient medical record:</Typography>
      {pastAppointments.map((app) => (
        <ExpansionPanelDetails>
          <Grid container justify='space-around'>
            <Typography>appointment clinic: {app.clinicId}</Typography>
            <Typography>doctor: {app.doctorId}</Typography>
            <Typography>appointment date and time: {new Date(app.appointmentStart).toLocaleString()}</Typography>
          </Grid>
        </ExpansionPanelDetails>
      ))}

    </div>
  )
}
