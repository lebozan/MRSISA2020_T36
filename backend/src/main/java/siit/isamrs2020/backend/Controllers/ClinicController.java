package siit.isamrs2020.backend.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicRepository;

@RestController
@RequestMapping("/api/doctors")
public class ClinicController {

  private ClinicRepository clinicRepository;

}