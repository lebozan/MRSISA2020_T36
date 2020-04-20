package siit.isamrs2020.backend.Controllers;

import java.util.List;

import com.google.gson.Gson;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Classes.ClinicCenterAdmin;
import siit.isamrs2020.backend.Repositories.ClinicCenterAdminRepository;

@RestController
@RequestMapping("/api/clinicCenterAdmins")
public class ClinicCenterAdminController {
    private ClinicCenterAdminRepository ccaRepo;
    private Gson gson;

    public ClinicCenterAdminController(ClinicCenterAdminRepository ccar){
        this.ccaRepo = ccar;
        this.gson = new Gson();
    }

    @GetMapping("/all")
    public List<ClinicCenterAdmin> getAllClCenAdmins(){
        return ccaRepo.findAll();
    }

    @PostMapping("/add")
    @ResponseBody
    public ClinicCenterAdmin addNewClCenAdmin(@RequestBody String requestData) {
        ClinicCenterAdmin newClCenAdmin = gson.fromJson(requestData, ClinicCenterAdmin.class);
        newClCenAdmin.setId("cca" + (ccaRepo.findAll().size() + 1));
        ccaRepo.save(newClCenAdmin);
        return newClCenAdmin;
    }

}