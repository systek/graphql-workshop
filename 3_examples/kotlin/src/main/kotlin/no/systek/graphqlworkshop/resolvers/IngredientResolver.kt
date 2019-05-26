package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import kotlinx.serialization.ImplicitReflectionSerializer
import no.systek.graphqlworkshop.clients.AllergensClient
import no.systek.graphqlworkshop.clients.MarketPriceClient
import no.systek.graphqlworkshop.storage.Ingredient
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

@ImplicitReflectionSerializer
@Component
class IngredientResolver(
    private val marketPriceClient: MarketPriceClient,
    private val allergensClient: AllergensClient
) : GraphQLResolver<Ingredient> {
    fun marketPrice(ingredient: Ingredient): CompletableFuture<Float> =
        CompletableFuture.supplyAsync { marketPriceClient.getMarketPrice(ingredient.name).price }

    fun allergens(ingredient: Ingredient): CompletableFuture<Collection<String>> =
        CompletableFuture.supplyAsync { allergensClient.getAllergens(ingredient.name).data.allergens }
}