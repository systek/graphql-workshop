package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import no.systek.graphqlworkshop.storage.DataSource
import no.systek.graphqlworkshop.storage.Dish
import org.springframework.stereotype.Component

@Component
class DishResolver(
        private val dataSource: DataSource
) : GraphQLResolver<Dish> {
    fun ingredients(dish: Dish) = dataSource.findIngredientsInDish(dish.id)
}