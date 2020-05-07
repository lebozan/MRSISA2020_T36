package siit.isamrs2020.backend.Controllers;

import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Repositories.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

  private DoctorRepository doctorRepository;
  private Gson gson;

  public DoctorController(DoctorRepository doctorRepository) {
    this.doctorRepository = doctorRepository;
    this.gson = new Gson();
  }

  @GetMapping("/all")
  public List<Doctor> getAllDoctors() {
    return doctorRepository.findAll();
  }

  @GetMapping("/getOne")
  @ResponseBody
  public Doctor getDoctor(@RequestParam String doctorId) {
    Optional<Doctor> optional = doctorRepository.findById(doctorId);
    if (optional.isPresent()) {
      Doctor d = optional.get();
      return d;
    }
    return null;
  }


  @GetMapping("/name")
  @ResponseBody
  public List<Doctor> getDoctorByName(@RequestParam(name = "firstName") String firstName) {
    List<Doctor> d = doctorRepository.findByFirstName(firstName);

    return d;
  }

  @PostMapping("/add")
  @ResponseBody
  public Doctor addNewDoctor(@RequestBody String requestData) {
    Doctor newDoctor = gson.fromJson(requestData, Doctor.class);
    newDoctor.setId("d" + (doctorRepository.findAll().size() + 1));
    doctorRepository.save(newDoctor);
    return newDoctor;
  }

  @DeleteMapping("/delete")
  @ResponseBody
  public boolean deleteDoctor(@RequestParam(name="doctorId") String doctorId) {
    boolean doctorExists = doctorRepository.existsById(doctorId);
    if (doctorExists) {
      doctorRepository.deleteById(doctorId);
    }
    return doctorExists;
    
  }

  @GetMapping("/leaveDaysLeft")
  @ResponseBody
  public int getDoctorLeaveDaysLeft(@RequestParam String doctorId) {
    Optional<Doctor> optional = doctorRepository.findById(doctorId);
    if (optional.isPresent()) {
      Doctor d = optional.get();
      return d.getLeaveDays();
    }
    return -1;
  }

  @PutMapping("/updateInfo")
  @ResponseBody
  public Doctor updateDoctorInfo(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Doctor> optional = doctorRepository.findById(json.get("doctorId").getAsString());
    if (optional.isPresent()) {
      Doctor d = optional.get();
      if (json.get("email") != null) {
        d.setEmail(json.get("email").getAsString());
      }

      if (json.get("firstName") != null) {
        d.setFirstName(json.get("firstName").getAsString());
      }

      if (json.get("lastName") != null) {
        d.setLastName(json.get("lastName").getAsString());
      }

      if (json.get("age") != null) {
        d.setAge(json.get("age").getAsInt());
      }

      if (json.get("address") != null) {
        d.setAddress(json.get("address").getAsString());
      }

      doctorRepository.save(d);
      return d;

    }

    return null;
  }

  @PutMapping("/updatePassword")
  @ResponseBody
  public boolean updateDoctorPassword(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Doctor> optional = doctorRepository.findById(json.get("doctorId").getAsString());
    if (optional.isPresent()) {
      Doctor d = optional.get();
      
      return true;
    }

    return false;
  }

}