package no.systek.graphqlworkshop.clients

import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.fuel.serialization.responseObject
import com.github.kittinunf.result.Result
import kotlinx.serialization.ImplicitReflectionSerializer
import org.springframework.stereotype.Component

@ImplicitReflectionSerializer
@Component
class AllergensClient {
    private val ALLERGENS_BY_INGREDIENT_QUERY =
        "query GetAllergensForIngredient(${'$'}ingredient: String!) { allergens(ingredient: ${'$'}ingredient)}"

    fun getAllergens(ingredient: String): AllergensResponse {
        val body = """
                      {
                        "operationName": "GetAllergensForIngredient",
                        "query": "$ALLERGENS_BY_INGREDIENT_QUERY",
                        "variables": { "ingredient": "${ingredient.toLowerCase()}"}
                      }
                    """

        var allergensResponse: AllergensResponse? = null
        "https://allergens.gql.systek.dev/"
            .httpPost()
            .header("Content-Type" to "application/json")
            .body(body)
            .also { println("Requesting allergens for $ingredient") }
            .responseObject<AllergensResponse> { _, _, result ->
                when (result) {
                    is Result.Failure
                    -> {
                        println("Error extracting allergens for $ingredient")
                        throw result.getException()
                    }
                    is Result.Success -> {
                        println("Allergens for $ingredient: ${result.value.data.allergens}")
                        allergensResponse = result.value
                    }
                }
            }.join()
        return allergensResponse!!
    }
}
