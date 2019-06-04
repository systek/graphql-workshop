package no.systek.graphqlworkshop.clients

import kotlinx.serialization.Serializable

@Serializable
data class MarketPriceBatchedResponse(
    val data: List<MarketPrice>
)

@Serializable
data class MarketPrice(
    val name: String,
    val price: Float
)

