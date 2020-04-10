package siit.isamrs2020.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.Nurse;

public interface NurseRepository extends MongoRepository<Nurse, String>{

}