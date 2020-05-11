package siit.isamrs2020.backend.Classes;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {
  
  private Date leaveStartDate;
  private Date leaveEndDate;
  private String staffId;

}