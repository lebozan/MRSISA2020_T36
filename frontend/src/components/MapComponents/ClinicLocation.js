import React from 'react'
import Paper from '@material-ui/core/Paper';
import CustomMap from './CustomMap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {width:'600px', height:'400px'},
});


export default function ClinicLocation(props) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CustomMap lat={props.lat} lng={props.lng} clinicName={props.clinicName}/>
      </Card>
    </div>
  )
}
