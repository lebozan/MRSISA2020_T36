package siit.isamrs2020.backend.Controllers;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import siit.isamrs2020.backend.Classes.ClinicAdmin;
import siit.isamrs2020.backend.Classes.ClinicCenterAdmin;
import siit.isamrs2020.backend.Classes.Doctor;
import siit.isamrs2020.backend.Classes.Nurse;
import siit.isamrs2020.backend.Classes.Patient;
import siit.isamrs2020.backend.Classes.User;
import siit.isamrs2020.backend.Repositories.ClinicAdminRepository;
import siit.isamrs2020.backend.Repositories.ClinicCenterAdminRepository;
import siit.isamrs2020.backend.Repositories.DoctorRepository;
import siit.isamrs2020.backend.Repositories.NurseRepository;
import siit.isamrs2020.backend.Repositories.PatientRepository;
import siit.isamrs2020.backend.Security.CustomUserDetails;

@RestController
@RequestMapping("/public")
public class LoginController {
  
  @Resource(name="authenticationManager")
  private AuthenticationManager authManager;

  @Autowired
  DoctorRepository doctorRepository;
  @Autowired
  PatientRepository patientRepository;
  @Autowired
  ClinicAdminRepository clinicAdminRepository;
  @Autowired
  NurseRepository nurseRepository;
  @Autowired
  ClinicCenterAdminRepository clinicCenterAdminRepository;

  private Gson gson;

  public LoginController() {
    super();
    this.gson = new Gson();
  }

  
  @RequestMapping(value = "/login", method = RequestMethod.POST)
  @ResponseBody
  public String login(@RequestBody final String requestString, final HttpServletRequest request) {
    JsonObject json = gson.fromJson(requestString, JsonObject.class);

    UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(json.get("email").getAsString(), json.get("password").getAsString());
    Authentication auth = authManager.authenticate(authReq);
    SecurityContext sc = SecurityContextHolder.getContext();
    sc.setAuthentication(auth);
    HttpSession session = request.getSession(true);
    session.setAttribute("SPRING_SECURITY_CONTEXT", sc);
    
    
    CustomUserDetails authenticatedUser = (CustomUserDetails) sc.getAuthentication().getPrincipal();
    User u = authenticatedUser.getUser();
    
    JsonObject responseData = gson.fromJson("{}", JsonObject.class);
    responseData.addProperty("id", u.getId());
    responseData.addProperty("session", session.getId());

    if (u instanceof Doctor) {
      Doctor d = (Doctor) u;
      responseData.addProperty("role", "doctor");
      responseData.addProperty("clinicId", d.getClinicId());
    } else if (u instanceof Nurse) {
      responseData.addProperty("role", "nurse");
    } else if (u instanceof ClinicAdmin) {
      ClinicAdmin ca = (ClinicAdmin) u;
      responseData.addProperty("role", "clinicAdmin");
      responseData.addProperty("clinicId", ca.getClinicId());
    } else if (u instanceof Patient) {
      responseData.addProperty("role", "patient");
    } else if (u instanceof ClinicCenterAdmin) {
      responseData.addProperty("role", "clinicCenterAdmin");
    } else {
      return null;
    }

    return responseData.toString();

  }
}