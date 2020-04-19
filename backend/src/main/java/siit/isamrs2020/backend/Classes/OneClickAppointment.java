package siit.isamrs2020.backend.Classes;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OneClickAppointment {

  private Date startTime;
  private int duration;
  private String type;
  private String room;
  private Doctor doctor;
  private int patientId;
  private int price;
  private boolean oneClick;

}