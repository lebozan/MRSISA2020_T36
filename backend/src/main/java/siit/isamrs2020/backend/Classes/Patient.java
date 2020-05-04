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
@Document("Patients")
public class Patient extends User {

    private String city;
    private String country;
    private int phoneNumber;
    private int uniquePatientNumber;
    private boolean active;

    public Patient(String id, String email, String password, String firstName, String lastName, int age, String address, String city, String country,int pn,int upn){
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = pn;
        this.uniquePatientNumber = upn;
        this.active = false;

    }

}