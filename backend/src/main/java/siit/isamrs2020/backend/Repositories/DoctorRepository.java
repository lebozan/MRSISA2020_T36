package siit.isamrs2020.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import siit.isamrs2020.backend.Classes.Doctor;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, Integer>{

  List<Doctor> findByFirstName(String firstName);

}