package no.systek.graphqlworkshop.clients

import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.serialization.responseObject
import com.github.kittinunf.result.Result
import kotlinx.serialization.ImplicitReflectionSerializer
import no.systek.graphqlworkshop.storage.Ingredient
import org.springframework.stereotype.Component

@Component
class MarketPriceClient {
    @ImplicitReflectionSerializer
    fun getMarketPrice(ingredient: String): MarketPriceResponse {
        var marketPriceDto: MarketPriceResponse? = null
        "https://market.gql.systek.dev/price"
            .httpGet(listOf("ingredient" to ingredient.toLowerCase()))
            .also { println("Requesting price for $ingredient") }
            .responseObject<MarketPriceResponse> { request, response, result ->
                when (result) {
                    is Result.Failure
                    -> {
                        if (response.statusCode == 200) {
                            println("No price found for $ingredient")
                            marketPriceDto = MarketPriceResponse(ingredient, -1f)
                        } else {
                            println("Error extracting marketprice for $ingredient")
                            throw result.getException()
                        }
                    }
                    is Result.Success -> {
                        marketPriceDto = result.value
                        println("Market price for $ingredient: ${result.value.price}")
                    }
                }
            }.join()
        return marketPriceDto!!
    }

    @ImplicitReflectionSerializer
    fun getBatchedMarketPrice(ingredients: Set<Ingredient>): Map<Ingredient, Float?> {
        var marketPrices: Map<Ingredient, Float?> = ingredients.map { it to null }.toMap()
        "https://market.gql.systek.dev/price"
            .httpGet(listOf("ingredients" to ingredients.map { it.name }.joinToString(separator = ",").toLowerCase()))
            .also { println("Requesting price for $ingredients.") }
            .responseObject<List<MarketPrice>> { request, response, result ->
                when (result) {
                    is Result.Failure
                    -> {
                        if (response.statusCode == 200) {
                            println("No price found for $ingredients")
                        } else {
                            println("Error extracting marketprice for $ingredients")
                            throw result.getException()
                        }
                    }
                    is Result.Success -> {
                        val results = result.value
                        marketPrices = ingredients.map { it to (results.find { marketPrice -> marketPrice.name == it.name }?.price) }.toMap()
                        println("Market price for $ingredients: ${marketPrices.values}")
                    }
                }
            }.join()
        return marketPrices
    }
}
