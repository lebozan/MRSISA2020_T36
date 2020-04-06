package siit.isamrs2020.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.DocumentPOJO.DoctorPOJO;

public interface DoctorRepository extends MongoRepository<DoctorPOJO, Integer>{

}