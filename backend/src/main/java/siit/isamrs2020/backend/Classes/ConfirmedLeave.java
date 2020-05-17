package siit.isamrs2020.backend.Classes;

import java.time.LocalDateTime;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("ConfirmedLeave")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmedLeave {
  @Id
  private String id;
  private String staffId;
  private LocalDateTime leaveStart;
  private LocalDateTime leaveEnd;
  private int clinicId;

}