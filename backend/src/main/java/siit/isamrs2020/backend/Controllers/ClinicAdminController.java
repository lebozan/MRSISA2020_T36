package siit.isamrs2020.backend.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Classes.ClinicAdmin;

@RestController
@RequestMapping("/api/clinicAdmins")
public class ClinicAdminController {

  private ClinicAdminRepository clinicAdminRepository;

  public ClinicAdminController(ClinicAdminRepository clinicAdminRepository) {
    this.clinicAdminRepository = clinicAdminRepository;
  }

  @GetMapping("/all")
  public List<ClinicAdmin> getAllClinicAdmins() {
    return clinicAdminRepository.findAll();
  }
}