package siit.isamrs2020.backend.Classes;

import org.hibernate.validator.internal.IgnoreForbiddenApisErrors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("unused")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Nurses")
public class Nurse extends User{

  private int yearsOfExperience;


  public Nurse(String id, String firstName, String lastName, int age, String address, int yearsOfExperience) {
    this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
    this.yearsOfExperience = yearsOfExperience;
  }

  public int getYearsOfExperience() {
    return this.yearsOfExperience;
  }

  public void setYearsOfExperience(int yearsOfExperience) {
    this.yearsOfExperience = yearsOfExperience;
  }



  
}