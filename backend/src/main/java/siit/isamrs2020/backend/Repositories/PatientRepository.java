package siit.isamrs2020.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.Patient;

public interface PatientRepository extends MongoRepository<Patient,String>{

    List<Patient> findByFirstName(String firstName);

    List<Patient> findByLastName(String lastName);

    List<Patient> findByUniquePatientNumber(int uniquePatientNumber);

    Optional<Patient> findByEmail(String email);

}