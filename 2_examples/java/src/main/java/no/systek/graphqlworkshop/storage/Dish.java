package no.systek.graphqlworkshop.storage;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Dish {

  private long id;
  private String name;
  private double price;
}
