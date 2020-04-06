package siit.isamrs2020.backend.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import siit.isamrs2020.backend.DocumentPOJO.DoctorPOJO;
import siit.isamrs2020.backend.Repositories.DoctorRepository;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

  private DoctorRepository doctorRepository;

  public DoctorController(DoctorRepository doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  @GetMapping("/all")
  public List<DoctorPOJO> getAllDoctors() {
    return doctorRepository.findAll();
  }

}