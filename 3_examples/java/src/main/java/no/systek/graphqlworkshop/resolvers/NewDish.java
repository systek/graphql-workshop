package no.systek.graphqlworkshop.resolvers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewDish {
  private long dishId;
  private long quantiy;

  public NewDish() {}

}
