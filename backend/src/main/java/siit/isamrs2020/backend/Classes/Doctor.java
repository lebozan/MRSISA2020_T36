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
	private int leaveDays;


	public Doctor(String id, String email, String firstName, String lastName, int age, String address, String workingHours, MedicalSpecialty specialty, int yearsOfExperience, String password) {

		this.id = id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
		this.workingHours = workingHours;
		this.specialty = specialty;
		this.yearsOfExperience = yearsOfExperience;
		int daysOfLeave = 20 + yearsOfExperience/3;
		if (daysOfLeave < 35) {
			this.leaveDays = daysOfLeave;
		} else {
			this.leaveDays = 35;
		}
		this.password = password;

	}

}
