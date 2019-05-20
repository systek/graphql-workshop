package no.systek.graphqlworkshop.storage;

import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DishIngredient {
  private long dishId;
  private Collection<Long> ingredientIds;
}
