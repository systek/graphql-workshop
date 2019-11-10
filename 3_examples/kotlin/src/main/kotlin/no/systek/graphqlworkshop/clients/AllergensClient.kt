package no.systek.graphqlworkshop.clients

import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody

private const val ALLERGENS_BY_INGREDIENT_QUERY =
    "query GetAllergensForIngredient(${'$'}ingredient: String!) { allergens(ingredient: ${'$'}ingredient)}"

@Component
class AllergensClient {
    private val client = WebClient.create("https://allergens.gql.systek.dev/")

    suspend fun getAllergens(ingredient: String): AllergensResponse =
        client.post()
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .bodyValue("""
                      {
                        "operationName": "GetAllergensForIngredient",
                        "query": "$ALLERGENS_BY_INGREDIENT_QUERY",
                        "variables": { "ingredient": "${ingredient.toLowerCase()}"}
                      }
                    """)
            .also { println("Requesting allergens for $ingredient") }
            .retrieve()
            .awaitBody()
}
