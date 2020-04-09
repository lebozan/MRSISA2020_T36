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
public class ClinicAdmin extends User{

  private Clinic clinic;


  public ClinicAdmin(int id, String firstName, String lastName, int age, String address, Clinic clinic) {
    this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
    this.clinic = clinic;
  }


  public Clinic getClinic() {
    return this.clinic;
  }

  public void setClinic(Clinic clinic) {
    this.clinic = clinic;
  }


  
}