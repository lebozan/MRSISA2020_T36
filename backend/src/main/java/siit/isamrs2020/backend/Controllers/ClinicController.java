package siit.isamrs2020.backend.Controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.lang.reflect.Type;

import com.google.gson.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Repositories.ClinicRepository;
import siit.isamrs2020.backend.Repositories.PriceListRepository;
import siit.isamrs2020.backend.Classes.Clinic;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.OneClickAppointment;
import siit.isamrs2020.backend.Classes.PriceList;
import siit.isamrs2020.backend.Classes.Room;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {

  private ClinicRepository clinicRepository;
  private Gson gson;
  @Autowired
  private PriceListRepository priceListRepository;

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
    Map<String, Double> m = Collections.synchronizedMap(new HashMap<String,Double>());
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


}