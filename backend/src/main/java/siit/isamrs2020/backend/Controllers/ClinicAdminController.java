package siit.isamrs2020.backend.Controllers;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.LeaveRequest;
import siit.isamrs2020.backend.Classes.UnconfirmedAppointment;

@RestController
@RequestMapping("/api/clinicAdmins")
public class ClinicAdminController {

  private ClinicAdminRepository clinicAdminRepository;
  private Gson gson;
  // private static UUID uuid;

  public ClinicAdminController(ClinicAdminRepository clinicAdminRepository) {
    this.clinicAdminRepository = clinicAdminRepository;
    this.gson = new Gson();
  }

  @GetMapping("/all")
  @ResponseBody
  public List<ClinicAdmin> getAllClinicAdmins() {
    return clinicAdminRepository.findAll();
  }

  @GetMapping("/getOne")
  @ResponseBody
  public ClinicAdmin getClinicAdmin(@RequestParam String clinicAdminId) {
    Optional<ClinicAdmin> optional = clinicAdminRepository.findById(clinicAdminId);
    if (optional.isPresent()) {
      ClinicAdmin ca = optional.get();
      return ca;
    }
    return null;
  }

  @GetMapping("/allUAs")
  @ResponseBody
  public List<UnconfirmedAppointment> getAllUnconfirmedAppointments(@RequestParam String clinicAdminId) {

    Optional<ClinicAdmin> optional = clinicAdminRepository.findById(clinicAdminId);
    if (optional.isPresent()) {
      ClinicAdmin clinicAdmin = optional.get();
      List<UnconfirmedAppointment> uas = clinicAdmin.getUnconfirmedAppointments();
      Collections.sort(uas);
      return uas;
    }
    return null;
  }

  @PostMapping("/submitUA")
  @ResponseBody
  public boolean addUnconfirmedAppointment(@RequestBody String requesString) {
    JsonObject json = gson.fromJson(requesString, JsonObject.class);
    UnconfirmedAppointment ua = new UnconfirmedAppointment(UUID.randomUUID().toString(),
      new Date(json.get("startTime").getAsLong()),
      json.get("patientId").getAsInt(),
      json.get("doctorId").getAsString(), json.get("type").getAsString());
    List<ClinicAdmin> clinicAdmins = clinicAdminRepository.findAll();
    for (ClinicAdmin ca : clinicAdmins) {
      if (ca.getClinicId() == json.get("clinicId").getAsInt()) {
        ca.getUnconfirmedAppointments().add(ua);
        clinicAdminRepository.save(ca);
        return true;
      }
    }

    return false;
  }

  @DeleteMapping("/deleteUA")
  @ResponseBody
  public boolean deleteUnconfirmedAppointment(@RequestParam String clinicAdminId, @RequestParam String id) {
    Optional<ClinicAdmin> optional = clinicAdminRepository.findById(clinicAdminId);
    if (optional.isPresent()) {
      ClinicAdmin ca = optional.get();
      for (UnconfirmedAppointment ua : ca.getUnconfirmedAppointments()) {
        if (ua.getId().equals(id)) {
          ca.getUnconfirmedAppointments().remove(ua);
          clinicAdminRepository.save(ca);
          return true;
        }
      }
    }
    return false;

  }

  @PutMapping("/updateInfo")
  @ResponseBody
  public ClinicAdmin updateClinicAdminInfo(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<ClinicAdmin> optional = clinicAdminRepository.findById(json.get("clinicAdminId").getAsString());
    if (optional.isPresent()) {
      ClinicAdmin ca = optional.get();
      if (json.get("email") != null) {
        ca.setEmail(json.get("email").getAsString());
      }

      if (json.get("firstName") != null) {
        ca.setFirstName(json.get("firstName").getAsString());
      }

      if (json.get("lastName") != null) {
        ca.setLastName(json.get("lastName").getAsString());
      }

      if (json.get("age") != null) {
        ca.setAge(json.get("age").getAsInt());
      }

      if (json.get("address") != null) {
        ca.setAddress(json.get("address").getAsString());
      }

      clinicAdminRepository.save(ca);
      return ca;

    }

    return null;
  }


  @PostMapping("/newLeaveRequest")
  @ResponseBody
  public boolean addNewClinicStaffLeaveRequest(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    LeaveRequest newLeaveRequest = new LeaveRequest(new Date(json.get("leaveStartDate").getAsLong()), 
      new Date(json.get("leaveEndDate").getAsLong()), json.get("staffId").getAsString());
    Optional<ClinicAdmin> optional = clinicAdminRepository.findByClinicId(json.get("clinicId").getAsInt());
    if (optional.isPresent()) {
      ClinicAdmin ca = optional.get();
      ca.getClinicStaffLeaveRequests().add(newLeaveRequest);
      clinicAdminRepository.save(ca);
      return true;
    }
    return false;
  }

}