import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



export default function LeaveRequestRow(props) {
  const {request, sendAccept, sendReject} = props;
  const [acceptRequest, setAcceptRequest] = React.useState(true);
  const [rejectionReason, setRejectionReason] = React.useState('');

  const manageRequest = (acceptBool) => {
    if (acceptRequest) {
      setAcceptRequest(acceptBool);
    }

    var data = {
      staffId: request.staffId,
      leaveStart: new Date(request.leaveStartDate).getTime(),
      leaveEnd: new Date(request.leaveEndDate).getTime(),
      id: request.id,
      leaveDuration: request.leaveDuration,
    }

    if (acceptBool) {
      sendAccept(data, request.id);
    } else {
      if (rejectionReason !== '') {
        data.rejectReason = rejectionReason;
        sendReject(data, request.id);
      } else {
        alert('Reason for rejecting a leave request must be entered!');
      }
    }
  }

  return (
    <div>
      <br/>
      <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{request.staffId}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify='space-around'>
              <Typography>Leave start date: {new Date(request.leaveStartDate).toLocaleDateString()}</Typography>
              <Typography>Leave end date: {new Date(request.leaveEndDate).toLocaleDateString()}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {manageRequest(true)}}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAcceptRequest(false);
                  manageRequest(false);
                }}
              >
                Reject
              </Button>

            </Grid>
          </ExpansionPanelDetails>
          {!acceptRequest ? 
            <ExpansionPanelDetails>
              <Grid container justify='center'>
                <TextareaAutosize aria-label="minimum height" value={rejectionReason} onChange={(e) => {setRejectionReason(e.target.value)}} placeholder="Write an explanation for rejecting this leave request" />
              </Grid>
              
            </ExpansionPanelDetails>
          : null}

        </ExpansionPanel>
    </div>
  )
}
