package siit.isamrs2020.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import siit.isamrs2020.backend.Classes.PriceList;


public interface PriceListRepository extends MongoRepository<PriceList, String> {

  Optional<PriceList> findByClinicIdAndActiveTrue(int clinicId);

  List<PriceList> findByClinicIdAndActiveFalse(int clinicId);

  List<PriceList> findByClinicId(int clinicId);
}