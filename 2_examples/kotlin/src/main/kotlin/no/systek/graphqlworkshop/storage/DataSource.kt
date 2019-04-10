package no.systek.graphqlworkshop.storage

import org.springframework.stereotype.Component

@Component
class DataSource {
    final val ingredients: MutableCollection<Ingredient>
    final val dishes: MutableCollection<Dish>
    final val dishIngredients: MutableCollection<DishIngredient>
    final val orders: MutableCollection<Order> = mutableListOf()

    init {
        ingredients = mutableListOf(
                Ingredient(1, "Good Fish"),
                Ingredient(2, "Bad Fish"),
                Ingredient(3, "Wasabi"),
                Ingredient(4, "Soy Sauce"),
                Ingredient(5, "Wicked Fish"))

        dishes = mutableListOf(
                Dish(100, "Sushi 8 pieces", 89.0),
                Dish(101, "Sushi 16 pieces", 89.0)
        )
        dishIngredients = mutableListOf(
                DishIngredient(100, listOf(1, 3))
        )
    }

    fun getDish(id: Long) = dishes.first { it.id == id }

    fun getIngredient(id: Long) = ingredients.first { it.id == id }

    fun addOrder(order: Order) = orders.add(order)

    fun findIngredientsInDish(dishId: Long): Collection<Ingredient> {
        val ingredientIds = dishIngredients.firstOrNull { it.dishId == dishId }?.ingredientIds ?: return emptyList()

        return ingredients.filter { it.id in ingredientIds }
    }
}
