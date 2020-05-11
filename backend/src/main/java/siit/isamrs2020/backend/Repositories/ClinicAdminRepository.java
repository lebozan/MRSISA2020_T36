package siit.isamrs2020.backend.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.ClinicAdmin;

public interface ClinicAdminRepository extends MongoRepository<ClinicAdmin,String>{

  Optional<ClinicAdmin> findByClinicId(int clinicId);

}