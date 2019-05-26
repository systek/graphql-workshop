package no.systek.graphqlworkshop.clients

import kotlinx.serialization.Serializable

@Serializable
data class AllergensResponse(
    val data: AllergensData
)

@Serializable
data class AllergensData(
    val allergens: Collection<String>
)