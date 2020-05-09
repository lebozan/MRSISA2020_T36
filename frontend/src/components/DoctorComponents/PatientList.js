import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


export default function PatientList(props) {
  const {rows} = props;


  return (
    <React.Fragment>
      {rows.map((row) => (
        <TableRow key={row.uniquePatientNumber}>
          <TableCell align="left">{row.firstName}</TableCell>
          <TableCell align="left">{row.lastName}</TableCell>
          <TableCell align="left">{row.address}</TableCell>
          <TableCell align="left">{row.age}</TableCell>
          <TableCell align="left">{row.city}</TableCell>
          <TableCell align="left">{row.uniquePatientNumber}</TableCell>
        </TableRow>
      ))}
    </React.Fragment>

  )
}
