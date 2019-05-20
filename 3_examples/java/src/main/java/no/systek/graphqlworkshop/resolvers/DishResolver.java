package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.Collection;
import no.systek.graphqlworkshop.storage.DataSource;
import no.systek.graphqlworkshop.storage.Dish;
import no.systek.graphqlworkshop.storage.Ingredient;
import org.springframework.stereotype.Component;

@Component
public class DishResolver implements GraphQLResolver<Dish> {

  private final DataSource dataSource;

  public DishResolver(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public Collection<Ingredient> ingredients(Dish dish) {
    return dataSource.findIngredientsInDish(dish.getId());
  }
}
