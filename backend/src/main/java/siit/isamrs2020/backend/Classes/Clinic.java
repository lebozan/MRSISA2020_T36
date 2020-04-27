package siit.isamrs2020.backend.Classes;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Clinics")
public class Clinic {
  
  @Id
  private int id;
  private String clinicName;
  private String clinicAddress;
  private String clinicDescription;
  private List<Doctor> doctors;
  private List<Room> rooms;
  private List<String> appointmentTypes;
  private List<OneClickAppointment> oneClickAppointments;

}