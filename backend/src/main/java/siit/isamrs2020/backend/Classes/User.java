package siit.isamrs2020.backend.Classes;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public abstract class User {

  @Id
  protected String id;
  protected String firstName;
  protected String lastName;
  protected int age;
  protected String address;


}