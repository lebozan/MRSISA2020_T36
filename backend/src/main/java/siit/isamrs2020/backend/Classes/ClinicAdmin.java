package siit.isamrs2020.backend.Classes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Document("ClinicAdmins")
public class ClinicAdmin extends User{

  private Clinic clinic;
  private List<UnconfirmedAppointment> unconfirmedAppointments;


  public ClinicAdmin(String id, String firstName, String lastName, int age, String address, Clinic clinic) {
    this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
    this.clinic = clinic;
    this.unconfirmedAppointments = new ArrayList<UnconfirmedAppointment>();
  }


  
}