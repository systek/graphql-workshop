package no.systek.graphqlworkshop.storage

import java.time.LocalDateTime

data class Order(
        val delivery: LocalDateTime,
        val items: Collection<Dish>
) {
    val orderId: Long = (Math.random() * Long.MAX_VALUE).toLong()
}