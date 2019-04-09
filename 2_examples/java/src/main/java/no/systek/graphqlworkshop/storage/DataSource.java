package no.systek.graphqlworkshop.storage;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import static java.util.Arrays.asList;

@Component
public class DataSource {

  private final Collection<Ingredient> ingredients = new ArrayList<>();
  private final Collection<Dish> dishes = new ArrayList<>();
  private final Collection<DishIngredient> dishIngredients = new ArrayList<>();
  private final Collection<Order> orders = new ArrayList<>();

  {
    ingredients.addAll(asList(
        new Ingredient(1, "Good Fish"),
        new Ingredient(2, "Bad Fish"),
        new Ingredient(3, "Wasabi"),
        new Ingredient(4, "Soy Sauce"),
        new Ingredient(5, "Wicked Fish")
    ));

    dishes.addAll(asList(
        new Dish(100, "Sushi 8 pieces", 89.0),
        new Dish(101, "Sushi 16 pieces", 89.0)
    ));

    dishIngredients.addAll(Collections.singletonList(
        new DishIngredient(100, asList(1L, 3L))
    ));
  }

  public Collection<Dish> getDishes() {
    return dishes;
  }

  public Dish getDish(Long id) {
    return dishes.stream()
        .filter(dish -> dish.getId() == id)
        .findFirst()
        .orElseThrow(IllegalArgumentException::new);
  }

  public void addOrder(Order order) {
    orders.add(order);
  }

  public Collection<Ingredient> getIngredients() {
    return ingredients;
  }

  private Ingredient getIngredient(long id) {
    return ingredients.stream().filter(ingredient -> ingredient.getId() == id).findFirst().orElseThrow(IllegalAccessError::new);
  }

  public Collection<Ingredient> findIngredientsInDish(long dishId) {
    Collection<Long> ingredientIds = dishIngredients.stream()
        .filter(dishIngredient -> dishIngredient.getDishId() == dishId)
        .findFirst()
        .orElseThrow(IllegalArgumentException::new).getIngredientIds();

    return ingredientIds.stream().map(this::getIngredient).collect(Collectors.toList());
  }

  public Collection<Order> getOrders() {
    return orders;
  }
}
