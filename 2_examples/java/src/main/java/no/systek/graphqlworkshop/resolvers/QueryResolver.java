package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import java.util.Collection;
import java.util.Comparator;
import java.util.stream.Collectors;
import no.systek.graphqlworkshop.clients.MarketPriceClient;
import no.systek.graphqlworkshop.storage.DataSource;
import no.systek.graphqlworkshop.storage.Dish;
import no.systek.graphqlworkshop.storage.Ingredient;
import no.systek.graphqlworkshop.storage.Order;
import no.systek.graphqlworkshop.storage.OrderByEnum;
import org.springframework.stereotype.Component;

@Component
public class QueryResolver implements GraphQLQueryResolver {

  private final MarketPriceClient marketPriceClient;
  private DataSource dataSource;

  public QueryResolver(DataSource dataSource, MarketPriceClient marketPriceClient) {
    this.dataSource = dataSource;
    this.marketPriceClient = marketPriceClient;
  }

  public Collection<Dish> getDishes() {
    return dataSource.getDishes();
  }

  public Dish getDish(Long dishId) {
    return dataSource.getDish(dishId);
  }

  public Collection<Order> getOrders() {
    return dataSource.getOrders();
  }

  public Collection<Ingredient> getIngredients(OrderByEnum orderBy) {
    switch (orderBy) {
      case NAME: return dataSource.getIngredients().stream()
          .sorted(Comparator.comparing(Ingredient::getName))
          .collect(Collectors.toList());
      case PRICE: return dataSource.getIngredients().stream()
          .sorted(Comparator.comparing(ingredient -> marketPriceClient.getMarketPrice(ingredient.getName())))
          .collect(Collectors.toList());
      default:
        throw new IllegalArgumentException("ordering operation does not exist");
    }
  }
}
