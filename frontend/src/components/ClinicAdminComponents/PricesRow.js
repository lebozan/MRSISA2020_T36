import React from 'react'
import EditPriceRow from './EditPriceRow';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function PricesRow(props) {
  const {appointmentType, appointmentPrice, changeItemPrice} = props;


  return (
    <React.Fragment>
      <TableRow key={appointmentType + ' row'}>
        <TableCell>
          {appointmentType}
        </TableCell>
        <TableCell>
          {appointmentPrice}
        </TableCell>
        <TableCell>
          <EditPriceRow key={appointmentType + ' edit row'} appointmentType={appointmentType} changeItemPrice={changeItemPrice}/>
        </TableCell>
      </TableRow>
    </React.Fragment>
      
  )
}
