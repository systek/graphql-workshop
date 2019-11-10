package no.systek.graphqlworkshop.clients

data class AllergensResponse(
    val data: AllergensData
)

data class AllergensData(
    val allergens: Collection<String>
)
