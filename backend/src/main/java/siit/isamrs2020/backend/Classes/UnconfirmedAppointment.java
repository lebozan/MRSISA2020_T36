package siit.isamrs2020.backend.Classes;


import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("UnconfirmedAppointments")
public class UnconfirmedAppointment implements Comparable<UnconfirmedAppointment> {

  private String id;
  private Date startTime;
  private int patientId;
  private String doctorId;
  private String type;

  @Override
  public int compareTo(UnconfirmedAppointment o) {

    if (getStartTime() != null || o.getStartTime() != null) {
      return getStartTime().compareTo(o.getStartTime());
    }
    
    return 0;
  }


}