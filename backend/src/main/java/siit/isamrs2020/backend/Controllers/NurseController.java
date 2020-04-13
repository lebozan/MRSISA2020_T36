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

import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Classes.Nurse;

@RestController
@RequestMapping("/api/nurses")
public class NurseController {
  
  private NurseRepository nurseRepository;
  private Gson gson;

  public NurseController(NurseRepository nurseRepository) {
    this.nurseRepository = nurseRepository;
    this.gson = new Gson();
  }


  @GetMapping("/all")
  public List<Nurse> getAllNurses() {
    return nurseRepository.findAll();
  }

  @PostMapping("/add")
  @ResponseBody
  public Nurse addNewNurse(@RequestBody String requestData) {
    Nurse newNurse = gson.fromJson(requestData, Nurse.class);
    newNurse.setId("n" + (nurseRepository.findAll().size() + 1));
    nurseRepository.save(newNurse);
    return newNurse;
  }
  
  @DeleteMapping("/delete")
  @ResponseBody
  public boolean deleteNurse(@RequestParam(name="nurseId") String nurseId) {
    boolean nurseExists = nurseRepository.existsById(nurseId);
    if (nurseExists) {
      nurseRepository.deleteById(nurseId);
    }
    return nurseExists;
    
  }
}