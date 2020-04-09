package siit.isamrs2020.backend.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Classes.Nurse;

@RestController
@RequestMapping("/api/nurses")
public class NurseController {
  
  private NurseRepository nurseRepository;


  public NurseController(NurseRepository nurseRepository) {
    this.nurseRepository = nurseRepository;
  }


  @GetMapping("/all")
  public List<Nurse> getAllNurses() {
    return nurseRepository.findAll();
  }

}