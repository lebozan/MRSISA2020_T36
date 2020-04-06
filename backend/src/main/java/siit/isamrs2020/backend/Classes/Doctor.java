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
public class Doctor {
	
	@Id
	private int id;
	private String firstName;
	private String lastName;

}
