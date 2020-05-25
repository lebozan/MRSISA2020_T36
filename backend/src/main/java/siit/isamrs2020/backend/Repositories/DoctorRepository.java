package siit.isamrs2020.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, String>{

  List<Doctor> findByFirstName(String firstName);
  Optional<Doctor> findByEmail(String email);

  // Optional<Doctor> findByIdAndLeaveDaysGreaterThen(String doctorId, int leaveDays);
}