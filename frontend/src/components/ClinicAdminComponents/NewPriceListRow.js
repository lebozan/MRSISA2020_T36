import React from 'react'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function NewPriceListRow(props) {
  const {appointmentType, createPrices} = props;
  // const [price, setPrice] = React.useState(0);
  
  return (

      <React.Fragment>
        <TableRow>
          <TableCell>
            <Typography>
              {appointmentType}
            </Typography>
          </TableCell>
          <TableCell>
            <TextField
              fullWidth
              key={appointmentType + ' new field'}
              defaultValue=''
              label={'Enter price for ' + appointmentType}
              onChange={(e) => {createPrices(appointmentType, e.target.value)}}
            />
          </TableCell>
        </TableRow>
      </React.Fragment>

  )
}
