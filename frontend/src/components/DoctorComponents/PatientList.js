import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Component for rendering each patient as a row in the table
export default function PatientList(props) {
  const {rows, selectPatient} = props;
  const [selectedRow, setSelectedRow] = React.useState({});

  const selectRow = (row) => {
    if (row.id === selectedRow.id) {

      setSelectedRow({});
      selectPatient({});
    } else {
      setSelectedRow(row);
      selectPatient(row);
    }
  }

  return (
    <React.Fragment>
      {rows.map((row) => (
        <TableRow 
          key={row.uniquePatientNumber}
          selected={selectedRow.id === row.id}
          onClick={() => {selectRow(row)}}
          >
          <TableCell align="left">{row.firstName}</TableCell>
          <TableCell align="left">{row.lastName}</TableCell>
          <TableCell align="left">{row.uniquePatientNumber}</TableCell>
        </TableRow>     
      ))}
    </React.Fragment>

  )
}
