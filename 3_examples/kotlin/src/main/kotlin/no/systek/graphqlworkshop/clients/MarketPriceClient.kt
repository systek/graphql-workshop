package no.systek.graphqlworkshop.clients

import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody

@Component
class MarketPriceClient {
    private val client = WebClient.create("https://market.gql.systek.dev")

    suspend fun getMarketPrice(ingredient: String): MarketPriceResponse =
        client.get()
            .uri {
                it.path("/price")
                    .queryParam("ingredient", ingredient.toLowerCase())
                    .build()
            }
            .also { println("Requesting price for $ingredient") }
            .retrieve()
            .awaitBody()
}
