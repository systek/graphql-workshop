package no.systek.graphqlworkshop.resolvers

import kotlinx.serialization.ImplicitReflectionSerializer
import no.systek.graphqlworkshop.clients.MarketPriceClient
import no.systek.graphqlworkshop.storage.Ingredient
import org.dataloader.MappedBatchLoader
import java.util.concurrent.CompletableFuture

class MarketPriceBatchLoader(
    private val client: MarketPriceClient
) : MappedBatchLoader<Ingredient, Float> {
    @ImplicitReflectionSerializer
    override fun load(keys: MutableSet<Ingredient>): CompletableFuture<Map<Ingredient, Float?>>? =
        CompletableFuture.supplyAsync { client.getBatchedMarketPrice(keys) }

}
