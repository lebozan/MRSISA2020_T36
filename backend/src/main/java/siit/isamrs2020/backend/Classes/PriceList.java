package siit.isamrs2020.backend.Classes;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Price lists")
public class PriceList {

  @Id
  private String id;
  private String name;
  private boolean active;
  private Map<String, Double> prices;
  private int clinicId;


}