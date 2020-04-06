package siit.isamrs2020.backend.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;

@RestController
@RequestMapping("/api/doctors")
public class ClinicAdminController {

  private ClinicAdminRepository clinicAdminRepository;

  
}