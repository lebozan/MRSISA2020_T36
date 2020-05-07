package siit.isamrs2020.backend.Config;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.MedicalSpecialty;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Classes.PriceList;
import siit.isamrs2020.backend.Classes.Room;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Repositories.PriceListRepository;
import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicRepository;

@SuppressWarnings("unused")
@EnableMongoRepositories(basePackageClasses = {DoctorRepository.class, NurseRepository.class, ClinicAdminRepository.class, ClinicRepository.class})
@Configuration
public class MongoDBConfig {

  @Bean
  CommandLineRunner commandLineRunner(DoctorRepository doctorRepository, NurseRepository nurseRepository, ClinicAdminRepository clinicAdminRepository, ClinicRepository clinicRepository, PriceListRepository priceListRepository) {
    return strings -> {
      // doctorRepository.deleteAll();
      // doctorRepository.save(new Doctor("d1", "drBojanCakic@mail.com", "Bojan", "Cakic", 40, "adresa1", "7-15", MedicalSpecialty.Gynecology, 10));
      // doctorRepository.save(new Doctor("d2", "drMilanMilic@mail.com", "Milan", "Milic", 35, "adresa2", "7-15", MedicalSpecialty.Radiology, 5));
      // doctorRepository.save(new Doctor("d3", "drNikolaNikolic@mail.com", "Nikola", "Nikolic", 41, "adresa3", "7-15", MedicalSpecialty.Oncology, 9));
      
      // nurseRepository.deleteAll();
      // nurseRepository.save(new Nurse("n1", "Marija", "Maric", 39, "adresa10", 12));
      // nurseRepository.save(new Nurse(a"n2", "Ana", "Nikolic", 25, "adresa123", 2));
      // ArrayList<Doctor> c1Doctors = new ArrayList<Doctor>();
      // c1Doctors.add(new Doctor("d1", "Bojan", "Cakic", 40, "adresa1", "7-15", MedicalSpecialty.Gynecology, 10));
      // c1Doctors.add(new Doctor("d2", "Milan", "Milic", 35, "adresa2", "14-21", MedicalSpecialty.Radiology, 5));
      
      // Clinic c1 = new Clinic(1, "clinic 1", "clinic address 1", "clinic 1 description", c1Doctors, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
      // c1.getRooms().add(new Room("Sala 1", new ArrayList<>()));
      // c1.getRooms().add(new Room("Sala 2", new ArrayList<>()));
      // c1.getRooms().add(new Room("Sala 3", new ArrayList<>()));
      // c1.getRooms().add(new Room("Sala 4", new ArrayList<>()));
      // Clinic c2 = new Clinic(2, "clinic 2", "clinic address 2", "clinic 2 description", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

      // clinicRepository.save(c1);
      // clinicRepository.save(c2);

      // clinicAdminRepository.save(new ClinicAdmin("ca1", "Zoran", "Zoric", 50, "zoranova kuca", c1));
      // Map<String, Double> m = Collections.synchronizedMap(new HashMap<String,Double>());
      // m.put("Pregled", 499.99);
      // m.put("Operacija", 5999.99);


      // PriceList pl1 = new PriceList("pl1", "Cenovnik 1", false, m, 1);
      // PriceList pl2 = new PriceList("pl2", "Cenovnik 2", true, m, 1);
      // PriceList pl3 = new PriceList("pl3", "Cenovnik 3", false, m, 1);
      // PriceList pl4 = new PriceList("pl4", "Cenovnik 4", false, m, 1);
      // PriceList pl11 = new PriceList("pl11", "Cenovnik 11", false, m, 2);
      // PriceList pl111 = new PriceList("pl111", "Cenovnik 111", true, m, 2);

      
      // priceListRepository.save(pl1);
      // priceListRepository.save(pl2);
      // priceListRepository.save(pl3);
      // priceListRepository.save(pl4);

      // priceListRepository.save(pl11);
      // priceListRepository.save(pl111);
    };

  }

}