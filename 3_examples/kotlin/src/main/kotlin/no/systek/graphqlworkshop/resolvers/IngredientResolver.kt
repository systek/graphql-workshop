package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import no.systek.graphqlworkshop.clients.AllergensClient
import no.systek.graphqlworkshop.clients.MarketPriceClient
import no.systek.graphqlworkshop.storage.Ingredient
import org.springframework.stereotype.Component

@Component
class IngredientResolver(
    private val marketPriceClient: MarketPriceClient,
    private val allergensClient: AllergensClient
) : GraphQLResolver<Ingredient> {
    suspend fun marketPrice(ingredient: Ingredient): Float =
        marketPriceClient.getMarketPrice(ingredient.name).price

    suspend fun allergens(ingredient: Ingredient): Collection<String> =
        allergensClient.getAllergens(ingredient.name).data.allergens
}
