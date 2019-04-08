package no.systek.graphqlworkshop.storage

data class Receipt(
        val orderId: Long,
        val delivery: String,
        val items: Collection<Dish>
)
