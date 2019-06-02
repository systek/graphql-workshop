package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import graphql.schema.DataFetchingEnvironment
import kotlinx.serialization.ImplicitReflectionSerializer
import no.systek.graphqlworkshop.clients.AllergensClient
import no.systek.graphqlworkshop.storage.Ingredient
import org.springframework.stereotype.Component
import java.util.concurrent.CompletableFuture

@Component
class IngredientResolver @ImplicitReflectionSerializer constructor(
    private val allergensClient: AllergensClient
) : GraphQLResolver<Ingredient> {
    fun marketPrice(ingredient: Ingredient, dfe: DataFetchingEnvironment): CompletableFuture<Float> =
        dfe.getDataLoader<Ingredient, Float>(MarketPriceBatchLoader::class.simpleName).load(ingredient)

    @ImplicitReflectionSerializer
    fun allergens(ingredient: Ingredient): Collection<String> =
        allergensClient.getAllergens(ingredient.name).data.allergens
}
