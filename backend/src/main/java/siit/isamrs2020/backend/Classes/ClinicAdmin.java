package siit.isamrs2020.backend.Classes;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Document("ClinicAdmins")
public class ClinicAdmin extends User{

  private int clinicId;
  private List<UnconfirmedAppointment> unconfirmedAppointments;
  private List<LeaveRequest> clinicStaffLeaveRequests;



  public ClinicAdmin(String id, String email, String firstName, String lastName, int age, String address, int clinicId, String password) {

    this.id = id;
    this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.address = address;
    this.clinicId = clinicId;
    this.unconfirmedAppointments = new ArrayList<UnconfirmedAppointment>();
    this.clinicStaffLeaveRequests = new ArrayList<LeaveRequest>();
    this.password = password;

  }


  
}