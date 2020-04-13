package siit.isamrs2020.backend.Controllers;

import java.util.List;

import com.google.gson.Gson;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

}