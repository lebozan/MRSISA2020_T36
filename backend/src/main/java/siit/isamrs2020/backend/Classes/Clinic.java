package siit.isamrs2020.backend.Classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("unused")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Clinics")
public class Clinic {
  
  @Id
  private int id;
  private String clinicName;
  private String clinicAddress;
  private String clinicDescription;


  public Clinic(int id, String clinicName, String clinicAddress, String clinicDescription) {
    this.id = id;
    this.clinicName = clinicName;
    this.clinicAddress = clinicAddress;
    this.clinicDescription = clinicDescription;
  }


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getClinicName() {
    return this.clinicName;
  }

  public void setClinicName(String clinicName) {
    this.clinicName = clinicName;
  }

  public String getClinicAddress() {
    return this.clinicAddress;
  }

  public void setClinicAddress(String clinicAddress) {
    this.clinicAddress = clinicAddress;
  }

  public String getClinicDescription() {
    return this.clinicDescription;
  }

  public void setClinicDescription(String clinicDescription) {
    this.clinicDescription = clinicDescription;
  }


}