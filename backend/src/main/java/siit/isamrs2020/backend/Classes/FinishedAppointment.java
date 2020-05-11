package siit.isamrs2020.backend.Classes;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinishedAppointment {
  private int clinicId;
  private String doctorId;
  private Date appointmentStart;
}