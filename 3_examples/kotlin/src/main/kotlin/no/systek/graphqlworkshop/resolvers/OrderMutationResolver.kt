package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import no.systek.graphqlworkshop.storage.DataSource
import no.systek.graphqlworkshop.storage.Dish
import no.systek.graphqlworkshop.storage.Order
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class OrderMutationResolver(
    private val dataSource: DataSource
) : GraphQLMutationResolver {
    fun order(dishes: Collection<NewOrder>): Order {
        val order = Order(
            LocalDateTime.now(),
            dishes.toDishes())
        dataSource.addOrder(order)
        return order
    }

    fun Collection<NewOrder>.toDishes(): List<Dish> = this.map { it.toDish() }

    fun NewOrder.toDish(): Dish = dataSource.getDish(this.dishId)
}

data class NewOrder(
    val dishId: Long,
    val quantity: Long
)
