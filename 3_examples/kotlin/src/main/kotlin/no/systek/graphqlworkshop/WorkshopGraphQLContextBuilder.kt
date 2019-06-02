package no.systek.graphqlworkshop

import graphql.servlet.GraphQLContext
import graphql.servlet.GraphQLContextBuilder
import no.systek.graphqlworkshop.clients.MarketPriceClient
import no.systek.graphqlworkshop.resolvers.MarketPriceBatchLoader
import org.dataloader.DataLoader
import org.dataloader.DataLoaderRegistry
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.websocket.Session
import javax.websocket.server.HandshakeRequest

@Component
class WorkshopGraphQLContextBuilder(
    private val marketPriceClient: MarketPriceClient
) : GraphQLContextBuilder {
    override fun build(httpServletRequest: HttpServletRequest?, httpServletResponse: HttpServletResponse?): GraphQLContext {
        val context = GraphQLContext(httpServletRequest, httpServletResponse)
        context.setDataLoaderRegistry(createDataLoaders())
        return context
    }

    override fun build(session: Session?, handshakeRequest: HandshakeRequest?): GraphQLContext {
        return GraphQLContext(session, handshakeRequest)
    }

    override fun build(): GraphQLContext {
        return GraphQLContext()
    }

    private fun createDataLoaders(): DataLoaderRegistry {
        val dataLoaderRegistry = DataLoaderRegistry()
        val marketpriceDataLoader = DataLoader.newMappedDataLoader(MarketPriceBatchLoader(marketPriceClient))
        dataLoaderRegistry.register(MarketPriceBatchLoader::class.simpleName, marketpriceDataLoader)

        return dataLoaderRegistry
    }
}
