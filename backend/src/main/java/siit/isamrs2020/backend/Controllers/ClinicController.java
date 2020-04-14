package siit.isamrs2020.backend.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicRepository;
import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.OneClickAppointment;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

  private ClinicRepository clinicRepository;
  private Gson gson;

  public ClinicController(ClinicRepository clinicRepository) {
    this.clinicRepository = clinicRepository;
    this.gson = new Gson();
  }

  @GetMapping("/all")
  public List<Clinic> getAllClinics() {
    return clinicRepository.findAll();
  }

  @GetMapping("/appTypes")
  @ResponseBody
  public List<String> getClinicAppointmentTypes(@RequestParam int clinicId) {
    Optional<Clinic> cOptional = clinicRepository.findById(clinicId);
    if (cOptional.isPresent()) {
      Clinic c = cOptional.get();
      return c.getAppointmentTypes();
    }
    return null;
  }

  @GetMapping("/doctors")
  @ResponseBody
  public List<Doctor> getClinicDoctors(@RequestParam int clinicId) {
    Optional<Clinic> cOptional = clinicRepository.findById(clinicId);
    if (cOptional.isPresent()) {
      Clinic c = cOptional.get();
      return c.getDoctors();
    }
    return null;
  }

  @PostMapping("/addAppType")
  @ResponseBody
  public boolean addAppointmentType(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Clinic> findClinic = clinicRepository.findById(json.get("clinicId").getAsInt());
    if (findClinic.isPresent()) {
      Clinic c = findClinic.get();
      if (!c.getAppointmentTypes().contains(json.get("appType").getAsString())) {
        c.getAppointmentTypes().add(json.get("appType").getAsString());
        clinicRepository.save(c);
        return true;
      }
    }
    return false;
  }

  @DeleteMapping("/deleteAppType")
  @ResponseBody
  public boolean deleteAppointmentType(@RequestParam int clinicId, @RequestParam String appType) {

    Optional<Clinic> findClinic = clinicRepository.findById(clinicId);
    if (findClinic.isPresent()) {
      Clinic c = findClinic.get();
      if(c.getAppointmentTypes().remove(appType)){
        clinicRepository.save(c);
        return true;
      }
    }
    return false;
  }

  @PostMapping("/addFastApt")
  @ResponseBody
  public OneClickAppointment addOneClickAppointment(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Clinic> cOptional = clinicRepository.findById(json.get("clinicId").getAsInt());
    if (cOptional.isPresent()) {
      Clinic c = cOptional.get();
      for (Doctor d : c.getDoctors()) {
        if (d.getId().equals(json.get("doctorId").getAsString())) {
          OneClickAppointment newAppointment = new OneClickAppointment(new Date(json.get("startTime").getAsInt()),
            json.get("duration").getAsInt(), json.get("type").getAsString(),
            json.get("room").getAsString(), d,json.get("price").getAsInt());
            c.getOneClickAppointments().add(newAppointment);
            clinicRepository.save(c);
            return newAppointment;
        }
      }
    }
    return null;
    
  }
}