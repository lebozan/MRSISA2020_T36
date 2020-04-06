package siit.isamrs2020.backend.Classes;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("unused")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("ClinicAdmins")
public class ClinicAdmin {

  @Id
  private int id;
  private String firstName;
  private String lastName;
  private List<Clinic> clinics;
  
}