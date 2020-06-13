package siit.isamrs2020.backend.Config;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.MedicalRecord;
import siit.isamrs2020.backend.Classes.MedicalSpecialty;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Classes.OneClickAppointment;
import siit.isamrs2020.backend.Classes.Patient;
import siit.isamrs2020.backend.Classes.PriceList;
import siit.isamrs2020.backend.Classes.Room;
import siit.isamrs2020.backend.Classes.UnconfirmedAppointment;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.LeaveRepository;
import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Repositories.PatientRepository;
import siit.isamrs2020.backend.Repositories.PriceListRepository;
import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicCenterAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicRepository;
import siit.isamrs2020.backend.Classes.FinishedAppointment;

@SuppressWarnings("unused")
@EnableMongoRepositories(basePackageClasses = {DoctorRepository.class, NurseRepository.class, ClinicAdminRepository.class, ClinicRepository.class, PriceListRepository.class, LeaveRepository.class,  UnconfirmedAppointment.class, PatientRepository.class, ClinicCenterAdminRepository.class})
@Configuration
public class MongoDBConfig {

  @Bean
  CommandLineRunner commandLineRunner(DoctorRepository doctorRepository, NurseRepository nurseRepository, ClinicAdminRepository clinicAdminRepository, ClinicRepository clinicRepository, PriceListRepository priceListRepository, PatientRepository patientRepository) {
    return strings -> {

      doctorRepository.deleteAll();
      Doctor d1 = new Doctor("d1", "drd1@mail.com", "Bojan", "Cakic", 40, "Izvorska 2", "8-15", MedicalSpecialty.Oncology, 10, "sifrad1", 1);
      Doctor d2 = new Doctor("d2", "drd2@mail.com", "Milan", "Milic", 35, "Dalmatinska 20", "14-21", MedicalSpecialty.Radiology, 5, "sifrad2", 1);
      Doctor d3 = new Doctor("d3", "drd3@mail.com", "Nikola", "Nikolic", 41, "Nemanjina 30", "7-15", MedicalSpecialty.Dermatology, 9, "sifrad3", 2);

      doctorRepository.save(d1);
      doctorRepository.save(d2);
      doctorRepository.save(d3);
      
      nurseRepository.deleteAll();
      nurseRepository.save(new Nurse("n1", "nurse1@mail.com", "Marija", "Maric", 39, "Lole Ribara 50", 12, "sifran1"));
      nurseRepository.save(new Nurse("n2", "nurse2@mail.com", "Ana", "Nikolic", 25, "Branicevska 11", 2, "sifran2"));

      ArrayList<Doctor> c1Doctors = new ArrayList<Doctor>();
      c1Doctors.add(d1);
      c1Doctors.add(d2);
      
      ArrayList<Nurse> c1Nurses = new ArrayList<Nurse>();
      c1Nurses.add(new Nurse("n1", "nurse1@mail.com", "Marija", "Maric", 39, "Lole Ribara 50", 12, "sifran1"));
      c1Nurses.add(new Nurse("n2", "nurse2@mail.com", "Ana", "Nikolic", 25, "Branicevska 11", 2, "sifran2"));

      Clinic c1 = new Clinic(1, "clinic 1", "clinic address 1", "clinic 1 description", "21.1853562,44.63285", c1Doctors, c1Nurses, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "pl1");
      c1.getRooms().add(new Room("Sala 1", new ArrayList<>()));
      c1.getRooms().add(new Room("Sala 2", new ArrayList<>()));
      c1.getRooms().add(new Room("Sala 3", new ArrayList<>()));
      c1.getRooms().add(new Room("Sala 4", new ArrayList<>()));

      c1.getAppointmentTypes().add("Pregled");
      c1.getAppointmentTypes().add("Operacija");

      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589090400000l), 30, "Pregled", "Sala 1", d1, 1000001, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589522400000l), 30, "Pregled", "Sala 1", d1, 1000001, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589954400000l), 30, "Pregled", "Sala 1", d1, 1000001, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1590134400000l), 30, "Pregled", "Sala 1", d1, 1000003, 499.99, false));
      
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589090400000l), 30, "Pregled", "Sala 2", d2, 1000002, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589522400000l), 30, "Pregled", "Sala 2", d2, 1000002, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1589954400000l), 30, "Pregled", "Sala 3", d2, 1000002, 499.99, false));
      c1.getOneClickAppointments().add(new OneClickAppointment(new Date(1590134400000l), 30, "Pregled", "Sala 2", d2, 1000004, 499.99, false));



      Clinic c2 = new Clinic(2, "clinic 2", "clinic address 2", "clinic 2 description", "21.193215,44.624715", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "pl111");

      c2.getRooms().add(new Room("Sala 1", new ArrayList<>()));
      c2.getRooms().add(new Room("Sala 2", new ArrayList<>()));

      c2.getAppointmentTypes().add("Pregled");
      c2.getAppointmentTypes().add("Operacija");

      c2.getOneClickAppointments().add(new OneClickAppointment(new Date(1590134400000l), 30, "Pregled", "Sala 1", d3, 1000003, 499.99, false));
      c2.getOneClickAppointments().add(new OneClickAppointment(new Date(1590134400000l), 30, "Pregled", "Sala 1", d3, 1000004, 499.99, false));
      c2.getOneClickAppointments().add(new OneClickAppointment(new Date(1590134400000l), 30, "Pregled", "Sala 1", d3, 1000005, 499.99, false));


      clinicRepository.deleteAll();
      clinicRepository.save(c1);
      clinicRepository.save(c2);

      clinicAdminRepository.deleteAll();
      clinicAdminRepository.save(new ClinicAdmin("ca1", "clinicAdmin1@mail.com", "Zoran", "Zoric", 50, "zoranova kuca", c1.getId(), "sifraca1"));
      clinicAdminRepository.save(new ClinicAdmin("ca2", "clinicadmin2@mail.com", "Stefan", "Arsic", 50, "zoranova kuca", c2.getId(), "sifraca2"));

      Map<String, Double> m = Collections.synchronizedMap(new HashMap<String,Double>());
      m.put("Pregled", 499.99);
      m.put("Operacija", 5999.99);


      PriceList pl1 = new PriceList("pl1", "Cenovnik 1", true, m, 1);
      PriceList pl2 = new PriceList("pl2", "Cenovnik 2", false, m, 1);
      PriceList pl3 = new PriceList("pl3", "Cenovnik 3", false, m, 1);
      PriceList pl4 = new PriceList("pl4", "Cenovnik 4", false, m, 1);
      PriceList pl11 = new PriceList("pl11", "Cenovnik 11", false, m, 2);
      PriceList pl111 = new PriceList("pl111", "Cenovnik 111", true, m, 2);

      priceListRepository.deleteAll();
      priceListRepository.save(pl1);
      priceListRepository.save(pl2);
      priceListRepository.save(pl3);
      priceListRepository.save(pl4);

      priceListRepository.save(pl11);
      priceListRepository.save(pl111);
      
      ArrayList<FinishedAppointment> mr1fAppointments = new ArrayList<>();
      mr1fAppointments.add(new FinishedAppointment(1, "d1", new Date(1589090400000l)));
      mr1fAppointments.add(new FinishedAppointment(1, "d1", new Date(1589522400000l)));
      mr1fAppointments.add(new FinishedAppointment(1, "d1", new Date(1589954400000l)));
      mr1fAppointments.add(new FinishedAppointment(2, "d3", new Date(1589702400000l)));

      MedicalRecord p1mr = new MedicalRecord("p1mr", mr1fAppointments);

      ArrayList<FinishedAppointment> mr2fAppointments = new ArrayList<>();
      mr2fAppointments.add(new FinishedAppointment(1, "d2", new Date(1589090400000l)));
      mr2fAppointments.add(new FinishedAppointment(1, "d2", new Date(1589522400000l)));
      mr2fAppointments.add(new FinishedAppointment(1, "d2", new Date(1589954400000l)));
      mr2fAppointments.add(new FinishedAppointment(2, "d3", new Date(1589706000000l)));

      MedicalRecord p2mr = new MedicalRecord("p2mr", mr2fAppointments);

      ArrayList<FinishedAppointment> mr3fAppointments = new ArrayList<>();
      mr3fAppointments.add(new FinishedAppointment(1, "d1", new Date(1590134400000l)));

      MedicalRecord p3mr = new MedicalRecord("p3mr", mr3fAppointments);

      
      ArrayList<FinishedAppointment> mr4fAppointments = new ArrayList<>();
      mr4fAppointments.add(new FinishedAppointment(1, "d2", new Date(1590134400000l)));

      MedicalRecord p4mr = new MedicalRecord("p4mr", mr4fAppointments);

      
      ArrayList<FinishedAppointment> mr5fAppointments = new ArrayList<>();
      mr5fAppointments.add(new FinishedAppointment(2, "d3", new Date(1590134400000l)));

      MedicalRecord p5mr = new MedicalRecord("p1mr", mr5fAppointments);

      Patient p1 = new Patient("p1", "patient1@mail.com", "sifrap1", "Milan", "Darkic", 30, "adresa p1", "Pozarevac", "Srbija", 64123456, 1000001, p1mr);
      Patient p2 = new Patient("p2", "patient2@mail.com", "sifrap2", "Darko", "Stevic", 35, "adresa p2", "Beograd", "Srbija", 64123456, 1000002, p2mr);
      Patient p3 = new Patient("p3", "patient3@mail.com", "sifrap3", "Stevan", "Milic", 50, "adresa p3", "Zajecar", "Srbija", 64123456, 1000003, p3mr);
      Patient p4 = new Patient("p4", "patient4@mail.com", "sifrap4", "Igor", "Stovic", 45, "adresa p4", "Novi Sad", "Srbija", 64123456, 1000004, p4mr);
      Patient p5 = new Patient("p5", "patient5@mail.com", "sifrap5", "Stefan", "Igic", 40, "adresa p5", "Pozarevac", "Srbija", 64123456, 1000005, p5mr);

      patientRepository.deleteAll();
      patientRepository.save(p1);
      patientRepository.save(p2);
      patientRepository.save(p3);
      patientRepository.save(p4);
      patientRepository.save(p5);
    };

  }

}