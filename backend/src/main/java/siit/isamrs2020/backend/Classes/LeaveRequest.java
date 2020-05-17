package siit.isamrs2020.backend.Classes;

import java.util.Date;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {
  
  @Id
  private String id;
  private Date leaveStartDate;
  private Date leaveEndDate;
  private String staffId;
  private int leaveDuration;

}