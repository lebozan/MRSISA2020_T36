package siit.isamrs2020.backend.Security;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.ClinicCenterAdmin;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Classes.Patient;
import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicCenterAdminRepository;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Repositories.PatientRepository;


@Service
public class CustomUserDetailService implements UserDetailsService {

  @Autowired
  DoctorRepository doctorRepository;
  @Autowired
  PatientRepository patientRepository;
  @Autowired
  ClinicAdminRepository clinicAdminRepository;
  @Autowired
  NurseRepository nurseRepository;
  @Autowired
  ClinicCenterAdminRepository clinicCenterAdminRepository;
  
  private Map<String, CustomUserDetails> users = new HashMap<>();

  @PostConstruct
  public void init() {
    List<Doctor> doctors = doctorRepository.findAll();
    List<Patient> patients = patientRepository.findAll();
    List<ClinicAdmin> clinicAdmins = clinicAdminRepository.findAll();
    List<Nurse> nurses = nurseRepository.findAll();
    List<ClinicCenterAdmin> clinicCenterAdmins = clinicCenterAdminRepository.findAll();

    for (Doctor d : doctors) {
      users.put(d.getEmail(), new CustomUserDetails(d, getAuthority("ROLE_DOCTOR")));
    }

    for (Patient p : patients) {
      users.put(p.getEmail(), new CustomUserDetails(p, getAuthority("ROLE_PATIENT")));
    }

    for (ClinicAdmin ca : clinicAdmins) {
      users.put(ca.getEmail(), new CustomUserDetails(ca, getAuthority("ROLE_CLINIC_ADMIN")));
    }

    for (Nurse n : nurses) {
      users.put(n.getEmail(), new CustomUserDetails(n, getAuthority("ROLE_NURSE")));
    }

    for (ClinicCenterAdmin cca : clinicCenterAdmins) {
      users.put(cca.getEmail(), new CustomUserDetails(cca, getAuthority("ROLE_CLINIC_CENTER_ADMIN")));
    }

  }

  @Override
  public UserDetails loadUserByUsername(String username) {
      return users.get(username);
  }

  private List<GrantedAuthority> getAuthority(String role) {
      return Collections.singletonList(new SimpleGrantedAuthority(role));
  }
  
  
}