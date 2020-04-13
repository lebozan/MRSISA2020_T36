package siit.isamrs2020.backend.Classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("unused")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Doctors")
public class Doctor extends User {

	private MedicalSpecialty specialty;
	private int yearsOfExperience;


	public Doctor(String id, String firstName, String lastName, int age, String address, int yearsOfExperience, MedicalSpecialty specialty) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
		this.specialty = specialty;
		this.yearsOfExperience = yearsOfExperience;
	}


	public MedicalSpecialty getSpecialty() {
		return this.specialty;
	}

	public void setSpecialty(MedicalSpecialty specialty) {
		this.specialty = specialty;
	}

	public int getYearsOfExperience() {
		return this.yearsOfExperience;
	}

	public void setYearsOfExperience(int yearsOfExperience) {
		this.yearsOfExperience = yearsOfExperience;
	}

	
}
