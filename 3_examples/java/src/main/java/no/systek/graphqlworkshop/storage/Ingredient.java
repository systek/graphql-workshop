package no.systek.graphqlworkshop.storage;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Ingredient {
  private long id;
  private String name;
}
