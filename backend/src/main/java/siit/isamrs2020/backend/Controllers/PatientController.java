package siit.isamrs2020.backend.Controllers;


import java.util.ArrayList;
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

import siit.isamrs2020.backend.Classes.FinishedAppointment;
import siit.isamrs2020.backend.Classes.Patient;
import siit.isamrs2020.backend.Repositories.PatientRepository;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private PatientRepository patientRepository;
    private Gson gson;

    public PatientController(PatientRepository pr){
        this.patientRepository = pr;
        this.gson = new Gson();
    }

    @GetMapping("/all")
    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }

    @PostMapping("/add")
    @ResponseBody
    public Patient addNewPatient(@RequestBody String requestData){
        Patient newPatient = gson.fromJson(requestData, Patient.class);
        newPatient.setId("p" + (patientRepository.findAll().size() + 1));
        patientRepository.save(newPatient);
        return newPatient;
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public boolean deletePatient(@RequestParam(name="patientId") String patientID){
        boolean patientExists = patientRepository.existsById(patientID);
        if (patientExists) {
            patientRepository.deleteById(patientID);
        }
        return patientExists;

    }

    @GetMapping("/fname")
    @ResponseBody
    public List<Patient> getPatientByFirstName(@RequestParam(name = "firstName") String firstName){
        List<Patient> pats = patientRepository.findByFirstName(firstName);

        return pats;

    }

    @GetMapping("/lname")
    @ResponseBody
    public List<Patient> getPatientByLastName(@RequestParam(name =  "lastName") String lastName){
        List<Patient> pats = patientRepository.findByLastName(lastName);

        return pats;

    }

    @GetMapping("/unumber")
    @ResponseBody
    public List<Patient> getPatientByUniquePatientNumber(@RequestParam(name =  "uniquePatientNumber") int uniquePatientNumber){
        List<Patient> pats = patientRepository.findByUniquePatientNumber(uniquePatientNumber);

        return pats;

    }

    @GetMapping("/getAllFromClinic")
    @ResponseBody
    public List<Patient> getAllPatientsFromClinic(@RequestParam int clinicId) {
        ArrayList<Patient> clinicPatients = new ArrayList<>();
        List<Patient> allPatients = patientRepository.findAll();
        for (Patient patient : allPatients) {
            for (FinishedAppointment finishedAppointment : patient.getMedicalRecord().getFinishedAppointments()) {
                if (finishedAppointment.getClinicId() == clinicId) {
                    clinicPatients.add(patient);
                    break;
                }
            }
        }


        return clinicPatients;
    }

}