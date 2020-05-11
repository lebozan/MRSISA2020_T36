package siit.isamrs2020.backend.Classes;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Document("ClinicCenterAdmins")
public class ClinicCenterAdmin {

    @Id
    protected String id;
    protected String firstName;
    protected String lastName;
    protected String email;
    private String password;


}