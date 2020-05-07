package siit.isamrs2020.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.ClinicCenterAdmin;

public interface ClinicCenterAdminRepository extends MongoRepository<ClinicCenterAdmin, String> {

}