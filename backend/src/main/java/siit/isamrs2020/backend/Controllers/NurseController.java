package siit.isamrs2020.backend.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Repositories.NurseRepository;

@RestController
@RequestMapping("/api/doctors")
public class NurseController {
  
  private NurseRepository nurseRepository;

}