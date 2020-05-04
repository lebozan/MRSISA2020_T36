package siit.isamrs2020.backend.Classes;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room implements Comparable<Room>{
  private String roomName;
  private List<Date> reservations;

  @Override
  public int compareTo(Room o) {
    return getRoomName().compareTo(o.getRoomName());
  }

}