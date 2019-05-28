package no.systek.graphqlworkshop.clients

import kotlinx.serialization.Serializable

@Serializable
data class MarketPriceResponse(
    val name: String,
    val price: Float
)
