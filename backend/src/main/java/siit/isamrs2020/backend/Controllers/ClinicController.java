package siit.isamrs2020.backend.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicRepository;
import siit.isamrs2020.backend.Classes.Clinic;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

  private ClinicRepository clinicRepository;

  public ClinicController(ClinicRepository clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  @GetMapping("/all")
  public List<Clinic> getAllClinics() {
    return clinicRepository.findAll();
  }
}