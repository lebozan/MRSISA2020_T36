package siit.isamrs2020.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.UnconfirmedAppointment;

public interface UnconfirmedAppointmentRepository extends MongoRepository<UnconfirmedAppointment, Integer>{

}