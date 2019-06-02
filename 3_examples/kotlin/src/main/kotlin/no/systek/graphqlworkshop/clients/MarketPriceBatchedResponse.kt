package no.systek.graphqlworkshop.clients

import kotlinx.serialization.Serializable

@Serializable
data class MarketPriceBatchedResponse(override val size: Int) : List<MarketPrice>


@Serializable
data class MarketPrice(
    val name: String,
    val price: Float
)

