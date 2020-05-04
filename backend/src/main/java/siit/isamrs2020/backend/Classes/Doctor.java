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


	private String workingHours;
	private MedicalSpecialty specialty;
	private int yearsOfExperience;


	public Doctor(String id, String firstName, String lastName, int age, String address, String workingHours, MedicalSpecialty specialty, int yearsOfExperience) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
		this.workingHours = workingHours;
		this.specialty = specialty;
		this.yearsOfExperience = yearsOfExperience;
	}

}
