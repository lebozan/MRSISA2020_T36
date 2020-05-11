import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import PatientMedicalRecord from './PatientMedicalRecord';
import Button from '@material-ui/core/Button';


export default function PatientPage(props) {
  const {patient} = props;

  return (
    <div>
      <br/>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{patient.firstName + ' ' + patient.lastName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container justify='space-around'>
            <Typography>Unique patient number: {patient.uniquePatientNumber}</Typography>
            <Typography>Age: {patient.age}</Typography>
            <Typography>City: {patient.city}</Typography>
          </Grid>

        </ExpansionPanelDetails>
        {patient.showMR ? <PatientMedicalRecord pastAppointments={patient.medicalRecord.finishedAppointments}/> : null}
        <Button variant="contained" color="primary">
          Start appointment
        </Button>
      </ExpansionPanel>
    </div>
  )
}
