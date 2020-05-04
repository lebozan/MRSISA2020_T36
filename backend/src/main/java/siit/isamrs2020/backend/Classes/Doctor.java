package siit.isamrs2020.backend.Classes;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Document("Doctors")
public class Doctor extends User {


	private MedicalSpecialty specialty;
	private int yearsOfExperience;


	public Doctor(String id, String firstName, String lastName, int age, String address, MedicalSpecialty specialty, int yearsOfExperience, String password) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
		this.specialty = specialty;
		this.yearsOfExperience = yearsOfExperience;
		this.password = password;
	}

}
