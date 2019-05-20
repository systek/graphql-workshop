package no.systek.graphqlworkshop.storage;

import java.time.LocalDateTime;
import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Order {
  private long orderId;
  private LocalDateTime delivery;
  private Collection<Dish> items;
}
