package siit.isamrs2020.backend.Controllers;

import java.util.ArrayList;
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
import siit.isamrs2020.backend.Classes.Room;

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

  @GetMapping("/rooms")
  @ResponseBody
  public List<Room> getClinicRooms(@RequestParam int clinicId) {
    Optional<Clinic> cOptional = clinicRepository.findById(clinicId);
    if (cOptional.isPresent()) {
      Clinic c = cOptional.get();
      return c.getRooms();
    }
    return null;
  }

  @PostMapping("/newRoom")
  @ResponseBody
  public Room addNewRoom(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Clinic> findClinic = clinicRepository.findById(json.get("clinicId").getAsInt());
    if (findClinic.isPresent()) {
      Clinic c = findClinic.get();
      Room newRoom = new Room(json.get("room").getAsString(), new ArrayList<Date>());
      if (!c.getRooms().contains(newRoom)) {
        c.getRooms().add(newRoom);
        clinicRepository.save(c);
        return newRoom;
      }
    }
    return null;
  }

  @DeleteMapping("/deleteRoom")
  @ResponseBody
  public boolean deleteRoom(@RequestParam int clinicId, @RequestParam String room) {
    Optional<Clinic> findClinic = clinicRepository.findById(clinicId);
    if (findClinic.isPresent()) {
      Clinic c = findClinic.get();
      for (Room r : c.getRooms()) {
        if (r.getRoomName().equals(room) && r.getReservations().isEmpty()) {
          c.getRooms().remove(r);
          clinicRepository.save(c);
          return true;
        }
      }
      
    }
    return false;
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
          OneClickAppointment newAppointment = new OneClickAppointment(new Date(json.get("startTime").getAsLong()),
            json.get("duration").getAsInt(), json.get("type").getAsString(),
            json.get("room").getAsString(), d, -1, json.get("price").getAsInt(), true);
          c.getOneClickAppointments().add(newAppointment);
          clinicRepository.save(c);
          return newAppointment;
        }
      }
    }
    return null;
    
  }

  @PostMapping("/confirmUA")
  @ResponseBody
  public boolean confirmUnconfirmedAppointment(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);

    Optional<Clinic> optional = clinicRepository.findById(json.get("clinicId").getAsInt());
    if (optional.isPresent()) {
      Clinic c = optional.get();
      for (Doctor d : c.getDoctors()) {
        if (d.getId().equals(json.get("doctorId").getAsString())) {
          // kad bude cenovnik cena se izvlaci iz njega
          Date appointmentDate = new Date(json.get("startTime").getAsLong());
          OneClickAppointment newAppointment = new OneClickAppointment(appointmentDate,
          json.get("duration").getAsInt(), json.get("type").getAsString(),
          json.get("room").getAsString(), d, json.get("patientId").getAsInt(),
          json.get("price").getAsInt(), false);

          for (Room r : c.getRooms()) {
            if (r.getRoomName().equals(json.get("room").getAsString())) {
              r.getReservations().add(appointmentDate);
            }
          }
          c.getOneClickAppointments().add(newAppointment);
          clinicRepository.save(c); 
          return true;
        }
      }


    }
    return false;
  }


}