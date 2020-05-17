package siit.isamrs2020.backend.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.ConfirmedLeave;

public interface LeaveRepository extends MongoRepository<ConfirmedLeave, Integer> {
  
  public List<ConfirmedLeave> findByStaffId(String staffId);
  public List<ConfirmedLeave> findByClinicId(int clinicId);
  
}