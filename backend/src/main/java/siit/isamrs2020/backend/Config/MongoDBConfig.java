package siit.isamrs2020.backend.Config;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.MedicalSpecialty;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicRepository;

@SuppressWarnings("unused")
@EnableMongoRepositories(basePackageClasses = {DoctorRepository.class, NurseRepository.class, ClinicAdminRepository.class, ClinicRepository.class})
@Configuration
public class MongoDBConfig {

  @Bean
  CommandLineRunner commandLineRunner(DoctorRepository doctorRepository, NurseRepository nurseRepository, ClinicAdminRepository clinicAdminRepository, ClinicRepository clinicRepository) {
    return strings -> {
      // doctorRepository.deleteAll();
      // doctorRepository.save(new Doctor("d1", "Bojan", "Cakic", 40, "adresa1", 10, MedicalSpecialty.Gynecology));
      // doctorRepository.save(new Doctor("d2", "Milan", "Milic", 35, "adresa2", 5, MedicalSpecialty.Radiology));
      // doctorRepository.save(new Doctor("d3", "Nikola", "Nikolic", 41, "adresa3", 9, MedicalSpecialty.Oncology));
      
      // nurseRepository.deleteAll();
      // nurseRepository.save(new Nurse("n1", "Marija", "Maric", 39, "adresa10", 12));
      // nurseRepository.save(new Nurse(a"n2", "Ana", "Nikolic", 25, "adresa123", 2));
      // ArrayList<Doctor> c1Doctors = new ArrayList<Doctor>();
      // c1Doctors.add(new Doctor("d1", "Bojan", "Cakic", 40, "adresa1", MedicalSpecialty.Gynecology, 10));
      // c1Doctors.add(new Doctor("d2", "Milan", "Milic", 35, "adresa2", MedicalSpecialty.Radiology, 5));
      
      // Clinic c1 = new Clinic(1, "clinic 1", "clinic address 1", "clinic 1 description", c1Doctors, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
      // c1.getRooms().add("Sala 1");
      // c1.getRooms().add("Sala 2");
      // c1.getRooms().add("Sala 3");
      // c1.getRooms().add("Sala 4");
      // Clinic c2 = new Clinic(2, "clinic 2", "clinic address 2", "clinic 2 description", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

      // clinicRepository.save(c1);
      // clinicRepository.save(c2);

      // clinicAdminRepository.save(new ClinicAdmin("ca1", "Zoran", "Zoric", 50, "zoranova kuca", c1));
      
    };

  }

}