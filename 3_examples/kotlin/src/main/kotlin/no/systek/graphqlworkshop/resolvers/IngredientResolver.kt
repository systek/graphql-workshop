package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import kotlinx.serialization.ImplicitReflectionSerializer
import no.systek.graphqlworkshop.clients.AllergensClient
import no.systek.graphqlworkshop.clients.MarketPriceClient
import no.systek.graphqlworkshop.storage.Ingredient
import org.springframework.stereotype.Component

@ImplicitReflectionSerializer
@Component
class IngredientResolver(
    private val marketPriceClient: MarketPriceClient,
    private val allergensClient: AllergensClient
) : GraphQLResolver<Ingredient> {
    fun marketPrice(ingredient: Ingredient): Float =
        marketPriceClient.getMarketPrice(ingredient.name).price

    fun allergens(ingredient: Ingredient): Collection<String> =
        allergensClient.getAllergens(ingredient.name).data.allergens
}
