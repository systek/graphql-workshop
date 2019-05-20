package no.systek.graphqlworkshop.storage

data class DishIngredient(
        val dishId: Long,
        val ingredientIds: Collection<Long>
)