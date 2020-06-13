package siit.isamrs2020.backend.Controllers;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.ConfirmedLeave;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Classes.OneClickAppointment;
import siit.isamrs2020.backend.Classes.PriceList;
import siit.isamrs2020.backend.Classes.Room;
import siit.isamrs2020.backend.Repositories.ClinicRepository;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.LeaveRepository;
import siit.isamrs2020.backend.Repositories.PriceListRepository;
import siit.isamrs2020.backend.Services.EmailService;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

  private ClinicRepository clinicRepository;
  private Gson gson;
  @Autowired
  private PriceListRepository priceListRepository;
  @Autowired
  private LeaveRepository leaveRepository;

  @Autowired
  private EmailService emailService;
  @Autowired
  private DoctorRepository doctorRepository;
  
  public ClinicController(ClinicRepository clinicRepository) {
    this.clinicRepository = clinicRepository;
    this.gson = new Gson();
  }

  @GetMapping("/all")
  @ResponseBody
  public List<Clinic> getAllClinics() {
    return clinicRepository.findAll();
  }

  @GetMapping("/getOne")
  @ResponseBody
  public Clinic getClinic(@RequestParam int clinicId) {
    Optional<Clinic> optional = clinicRepository.findById(clinicId);
    if (optional.isPresent()) {
      return optional.get();
    }
    return null;
  }

  @GetMapping("/getInfo")
  @ResponseBody
  public String getClinicInfo(@RequestParam int clinicId) {
    Optional<Clinic> optional = clinicRepository.findById(clinicId);
    if (optional.isPresent()) {
      Clinic c = optional.get();
      JsonObject clinicInfo = gson.fromJson("{}", JsonObject.class);
      clinicInfo.addProperty("name", c.getClinicName());
      clinicInfo.addProperty("description", c.getClinicDescription());
      clinicInfo.addProperty("address", c.getClinicAddress());
      String[] longLat = c.getLocationCoordinates().split(",");
      float latitude = Float.parseFloat(longLat[1]);
      float longitude = Float.parseFloat(longLat[0]);
      clinicInfo.addProperty("long", longitude);
      clinicInfo.addProperty("lat", latitude);
      return clinicInfo.toString();
    }
    return null;
  }

  @PutMapping("/updateInfo")
  @ResponseBody
  public boolean updateClinicInfo(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Clinic> optional = clinicRepository.findById(json.get("clinicId").getAsInt());
    if (optional.isPresent()) {
      Clinic c = optional.get();
      if (json.get("name") != null) {
        c.setClinicName(json.get("name").getAsString());
      }

      if (json.get("description") != null) {
        c.setClinicDescription(json.get("description").getAsString());
      }

      if (json.get("address") != null) {
        c.setClinicAddress(json.get("address").getAsString());
      }

      clinicRepository.save(c);

      return true;
    }
    return false;
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

  @GetMapping("/nurses")
  @ResponseBody
  public List<Nurse> getClinicNurses(@RequestParam int clinicId) {
    Optional<Clinic> cOptional = clinicRepository.findById(clinicId);
    if (cOptional.isPresent()) {
      Clinic c = cOptional.get();
      return c.getNurses();
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

  @PostMapping("/addDoctor")
  @ResponseBody
  public Doctor addNewDoctor(@RequestBody String requestData, @RequestParam int clinicId) {
    Doctor newDoctor = gson.fromJson(requestData, Doctor.class);
    String doctorId = "d" + (doctorRepository.findAll().size() + 1);
    newDoctor.setId(doctorId);
    newDoctor.setEmail("dr" + doctorId + "@mail.com");
    newDoctor.setPassword("sifra" + doctorId);
    int leaveDays = 20 + newDoctor.getYearsOfExperience()/3;
    if (leaveDays > 35) {
      leaveDays = 35;
    }
    newDoctor.setLeaveDays(leaveDays);
    
    Optional<Clinic> optionalClinic = clinicRepository.findById(clinicId);
    if (optionalClinic.isPresent()) {
      Clinic c = optionalClinic.get();
      c.getDoctors().add(newDoctor);
      clinicRepository.save(c);
      doctorRepository.save(newDoctor);
    }
    return newDoctor;
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
      Optional<PriceList> optionalPL = priceListRepository.findById(c.getActivePriceList());
      if (!c.getAppointmentTypes().contains(json.get("appTypeName").getAsString())) {
        c.getAppointmentTypes().add(json.get("appTypeName").getAsString());
        clinicRepository.save(c);
        PriceList activePriceList = optionalPL.get();
        activePriceList.getPrices().put(json.get("appTypeName").getAsString(), json.get("appTypePrice").getAsDouble());
        priceListRepository.save(activePriceList);

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
      Optional<PriceList> optionalPL = priceListRepository.findById(c.getActivePriceList());
      PriceList activePriceList = optionalPL.get();
      if(c.getAppointmentTypes().remove(appType)){
        clinicRepository.save(c);
        activePriceList.getPrices().remove(appType);
        priceListRepository.save(activePriceList);
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
          Optional<PriceList> optionalPl = priceListRepository.findByClinicIdAndActiveTrue(json.get("clinicId").getAsInt());
          if (optionalPl.isPresent()) {
            OneClickAppointment newAppointment = new OneClickAppointment(new Date(json.get("startTime").getAsLong()),
              json.get("duration").getAsInt(), json.get("type").getAsString(),
              json.get("room").getAsString(), d, -1, optionalPl.get().getPrices().get(json.get("type").getAsString()), true);
            c.getOneClickAppointments().add(newAppointment);
            clinicRepository.save(c);
            return newAppointment;
          }

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
          Optional<PriceList> optionalPl = priceListRepository.findByClinicIdAndActiveTrue(json.get("clinicId").getAsInt());
          Date appointmentDate = new Date(json.get("startTime").getAsLong());
          if (optionalPl.isPresent()) {
            OneClickAppointment newAppointment = new OneClickAppointment(appointmentDate,
              json.get("duration").getAsInt(), json.get("type").getAsString(),
              json.get("room").getAsString(), d, json.get("patientId").getAsInt(),
            optionalPl.get().getPrices().get(json.get("type").getAsString()), false);

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

    }
    return false;
  }


  @GetMapping("/priceLists")
  @ResponseBody
  public List<PriceList> getAllPriceLists() {
    return priceListRepository.findAll();
  }

  @GetMapping("/clinicPriceLists")
  @ResponseBody
  public List<PriceList> getPriceListsByClinic(@RequestParam int clinicId) {
    return priceListRepository.findByClinicId(clinicId);
  }

  @GetMapping("/priceList")
  @ResponseBody
  public PriceList getAllPriceLists(@RequestParam String priceListId) {
    Optional<PriceList> optional = priceListRepository.findById(priceListId);
    if (optional.isPresent()) {
      return optional.get();
    }

    return null;
  }

  @PostMapping("/newPriceList")
  @ResponseBody
  public PriceList addNewPriceList(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Type type = new TypeToken<Map<String, Double>>(){}.getType();
    Map<String, Double> prices = gson.fromJson(json.get("prices"), type);
    String plId = "pl" + priceListRepository.findAll().size() + 1;
    PriceList newPl = new PriceList(plId, json.get("priceListName").getAsString(),
      false, prices, json.get("clinicId").getAsInt());
    return priceListRepository.save(newPl);

  }


  @DeleteMapping("/deletePriceList")
  @ResponseBody
  public boolean deletePriceList(@RequestParam String priceListId) {
    Optional<PriceList> optional = priceListRepository.findById(priceListId);
    if (optional.isPresent()) {
      PriceList pl = optional.get();
      priceListRepository.delete(pl);
      return true;
    }

    return false;
  }


  @PutMapping("/changeActivePriceList")
  @ResponseBody
  public List<PriceList> changeActivePriceList(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    Optional<Clinic> optionalClinic = clinicRepository.findById(json.get("clinicId").getAsInt());
    Optional<PriceList> optional = priceListRepository.findByClinicIdAndActiveTrue(json.get("clinicId").getAsInt());
    Optional<PriceList> forActivation = priceListRepository.findById(json.get("priceListId").getAsString());
    if (optional.isPresent() && forActivation.isPresent() && optionalClinic.isPresent()) {
      PriceList pl = optional.get();
      PriceList priceList = forActivation.get();
      Clinic c = optionalClinic.get();
      if (!priceList.isActive()) {
        pl.setActive(false);
        priceListRepository.save(pl);
        priceList.setActive(true);
        priceListRepository.save(priceList);
        c.setActivePriceList(priceList.getId());
        clinicRepository.save(c);

        return priceListRepository.findByClinicId(json.get("clinicId").getAsInt());
      }
    }

    return null;
  }

  @PutMapping("/changePrice")
  @ResponseBody
  public boolean changePriceForPriceListElement(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);

    Optional<PriceList> optional = priceListRepository.findById(json.get("priceListId").getAsString());
    if (optional.isPresent()) {
      PriceList pl = optional.get();
      pl.getPrices().put(json.get("updateKey").getAsString(), json.get("updateValue").getAsDouble());
      priceListRepository.save(pl);
      return true;
    }

    return false;
  }

  @GetMapping("reports")
  @ResponseBody
  public String getReportData(@RequestParam int clinicId, @RequestParam String report, @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) LocalDateTime startDate, @RequestParam@DateTimeFormat(iso = ISO.DATE_TIME) LocalDateTime endDate) {
    Optional<Clinic> optional = clinicRepository.findById(clinicId);
    startDate = startDate.plusHours(2);
    endDate = endDate.plusHours(2);

    if (optional.isPresent()) {
      Clinic c = optional.get();
      JsonArray chartData = new JsonArray();
      if (report.equals("daily")) {
        
        int numberOfAppointments = 0;
        LocalDateTime endLocalDate = startDate.plusDays(7);

        LocalDateTime checkDate = startDate;
        while (checkDate.isBefore(endLocalDate)) {
          JsonObject dayData = new JsonObject();
          for (OneClickAppointment appointment : c.getOneClickAppointments()) {
            LocalDateTime appointmentDate = LocalDateTime.ofInstant(appointment.getStartTime().toInstant(), ZoneId.systemDefault());
  
            if (appointmentDate.getDayOfMonth() == checkDate.getDayOfMonth() && appointmentDate.isAfter(checkDate) && appointmentDate.isBefore(endLocalDate)) {
              numberOfAppointments++;
            }
          }

          dayData.addProperty("appointments", numberOfAppointments);
          dayData.addProperty("date", checkDate.toLocalDate().toString());
          chartData.add(dayData);
          numberOfAppointments = 0;
          checkDate = checkDate.plusDays(1);
        }


      } else if (report.equals("weekly")) {
        int numberOfAppointments = 0;
        int weekCounter = 1;
        LocalDateTime endMonth = startDate.plusMonths(1);
        endMonth = endMonth.minusDays(1);

        LocalDateTime weekStartDate = startDate;
        LocalDateTime weekEndDate = endDate.plusDays(6);
        while (weekCounter < 6) {
          JsonObject weekData = new JsonObject();
          for (OneClickAppointment appointment : c.getOneClickAppointments()) {
            LocalDateTime appointmentDate = LocalDateTime.ofInstant(appointment.getStartTime().toInstant(), ZoneId.systemDefault());
  
            if (appointmentDate.isAfter(weekStartDate) && appointmentDate.isBefore(weekEndDate)) {
              numberOfAppointments++;
            }
          }
          weekData.addProperty("appointments", numberOfAppointments);
          weekData.addProperty("date", weekStartDate.toLocalDate().toString() + "-" + weekEndDate.toLocalDate().toString());
          chartData.add(weekData);
          
          if (weekCounter == 4) {
            weekStartDate = weekStartDate.plusDays(7);
            weekEndDate = endMonth;
          } else {
            weekStartDate = weekStartDate.plusDays(7);
            weekEndDate = weekEndDate.plusDays(7);
          }
          weekCounter++;
          numberOfAppointments = 0;

        }
        
      } else if (report.equals("monthly")) {
        int numberOfAppointments = 0;
        while (startDate.isBefore(endDate)) {
          JsonObject monthData = new JsonObject();
          for (OneClickAppointment appointment : c.getOneClickAppointments()) {
            LocalDateTime appointmentDate = LocalDateTime.ofInstant(appointment.getStartTime().toInstant(), ZoneId.systemDefault());
  
            if (appointmentDate.getYear() == startDate.getYear() && appointmentDate.getMonthValue() == startDate.getMonthValue()) {
              numberOfAppointments++;
            }
          }
          monthData.addProperty("appointments", numberOfAppointments);
          monthData.addProperty("date", startDate.getMonth().toString() + " " + startDate.getYear());
          chartData.add(monthData);
          startDate = startDate.plusMonths(1);
          numberOfAppointments = 0;

        }

      } else if (report.equals("earnings")) {
        double clinicEarnings = 0;
        JsonObject earningData = new JsonObject();

        for (OneClickAppointment appointment : c.getOneClickAppointments()) {
          LocalDateTime appointmentDate = LocalDateTime.ofInstant(appointment.getStartTime().toInstant(), ZoneId.systemDefault());

          if (appointmentDate.isAfter(startDate) && appointmentDate.isBefore(endDate)) {
            clinicEarnings = clinicEarnings + appointment.getPrice();
          }
        }
        earningData.addProperty("earnings", clinicEarnings);
        earningData.addProperty("startDate", startDate.toLocalDate().toString());
        earningData.addProperty("endDate", endDate.toLocalDate().toString());
        chartData.add(earningData);

      } else {
        return null;
      }

      return chartData.toString();

    }

    return null;
  }

  @PostMapping("/confirmLeaveRequest")
  @ResponseBody
  public boolean confirmLeaveRequest(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);
    LocalDateTime leaveStart = LocalDateTime.ofInstant(Instant.ofEpochMilli(json.get("leaveStart").getAsLong()) , ZoneId.systemDefault());
    LocalDateTime leaveEnd = LocalDateTime.ofInstant(Instant.ofEpochMilli(json.get("leaveEnd").getAsLong()) , ZoneId.systemDefault());

    ConfirmedLeave newConfirmedLeave = new ConfirmedLeave(json.get("id").getAsString(), json.get("staffId").getAsString(), 
      leaveStart, leaveEnd, json.get("clinicId").getAsInt());
    
    Optional<Doctor> optionalDoctor = doctorRepository.findById(json.get("staffId").getAsString());
    if (optionalDoctor.isPresent()) {
      Doctor d = optionalDoctor.get();
      if (d.getId().equals(json.get("staffId").getAsString())) {
        String mailText = "Your leave request for period from " + leaveStart.toLocalDate().toString() + " to " + leaveEnd.toLocalDate().toString() + " has been accepted.";
        emailService.sendMail("Your_clinic_admin", d.getEmail(), "Leave request accepted", mailText);

        leaveRepository.save(newConfirmedLeave);
        return true;
      }
    }

    return false;
  }

  @PostMapping("/rejectLeaveRequest")
  @ResponseBody
  public boolean rejectLeaveRequest(@RequestBody String requestString) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);

    LocalDateTime leaveStart = LocalDateTime.ofInstant(Instant.ofEpochMilli(json.get("leaveStart").getAsLong()) , ZoneId.systemDefault());
    LocalDateTime leaveEnd = LocalDateTime.ofInstant(Instant.ofEpochMilli(json.get("leaveEnd").getAsLong()) , ZoneId.systemDefault());
    
    // long daysBetween = ChronoUnit.DAYS.between(leaveStart, leaveEnd);

    Optional<Doctor> optionalDoctor = doctorRepository.findById(json.get("staffId").getAsString());
    if (optionalDoctor.isPresent()) {
      Doctor d = optionalDoctor.get();
      if (d.getId().equals(json.get("staffId").getAsString())) {
        String mailText = "Your leave request for period from " + leaveStart.toLocalDate().toString() + " to " + leaveEnd.toLocalDate().toString() + " has been rejected. Reason is listed below.\n\n";
        mailText = mailText + json.get("rejectReason").getAsString();
        d.setLeaveDays(d.getLeaveDays() + json.get("leaveDuration").getAsInt());
        doctorRepository.save(d);

        emailService.sendMail("Your_clinic_admin", d.getEmail(), "Leave request rejected", mailText);

        return true;
      }
    }
    // Optional<Clinic> optional = clinicRepository.findById(json.get("clinicId").getAsInt());

    return false;
  }


}