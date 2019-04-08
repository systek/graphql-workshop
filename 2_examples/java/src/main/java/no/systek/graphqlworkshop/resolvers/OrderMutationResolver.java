package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import no.systek.graphqlworkshop.storage.DataSource;
import no.systek.graphqlworkshop.storage.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMutationResolver implements GraphQLMutationResolver {

  private final DataSource dataSource;

  public OrderMutationResolver(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Order order(List<NewDish> dishes) {
    Order order = new Order(
        new Double((Math.random() * Long.MAX_VALUE)).longValue(),
        LocalDateTime.now(),
        dishes.stream()
            .map(dish -> dataSource.getDish(dish.getDishId()))
            .collect(Collectors.toList())
    );
    dataSource.addOrder(order);
    return order;
  }
}

